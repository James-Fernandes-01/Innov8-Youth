import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, updateDoc, doc, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { Check, X } from "lucide-react";

export default function AdminDashboard() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [pendingHours, setPendingHours] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminDashboard: pendingHours changed:", pendingHours.length);
  }, [pendingHours]);

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/login");
      return;
    }

    // Check if user is admin
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const unsubscribeUser = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().role === "admin") {
        setIsAdmin(true);
      } else {
        navigate("/");
      }
    });

    return unsubscribeUser;
  }, [navigate]);

  useEffect(() => {
    if (!isAdmin) return;

    console.log("AdminDashboard: Setting up onSnapshot for all hours");

    // Get ALL volunteer hours and filter client-side
    const hoursRef = collection(db, "volunteer_hours");

    console.log("AdminDashboard: Query created for all hours");

    const unsubscribe = onSnapshot(hoursRef, (snapshot) => {
      console.log("AdminDashboard: onSnapshot fired, total docs:", snapshot.docs.length);

      // Filter for pending hours client-side
      const pendingHoursData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp),
        }))
        .filter((hour) => hour.status === "pending");

      console.log("AdminDashboard: Filtered to", pendingHoursData.length, "pending hours");
      setPendingHours(pendingHoursData.sort((a, b) => b.timestamp - a.timestamp));
      
      setLoading(false);
    }, (error) => {
      console.error("AdminDashboard: onSnapshot error:", error);
    });

    console.log("AdminDashboard: onSnapshot listener set up");

    return unsubscribe;
  }, [isAdmin]);

  const refreshData = async () => {
    if (!isAdmin) return;
    
    try {
      console.log("AdminDashboard: Manually refreshing data");
      const hoursRef = collection(db, "volunteer_hours");
      const snapshot = await getDocs(hoursRef);
      
      // Filter for pending hours client-side
      const pendingHoursData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp),
        }))
        .filter((hour) => hour.status === "pending");
      
      console.log("AdminDashboard: Manual refresh found", pendingHoursData.length, "pending hours");
      setPendingHours(pendingHoursData.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error("Error refreshing data:", error);
    }
  };

  // Expose refreshData to window for debugging
  useEffect(() => {
    if (isAdmin) {
      window.refreshAdminDashboard = refreshData;
    }
  }, [isAdmin]);

  const handleApprove = async (docId) => {
    try {
      console.log("Approving document:", docId);
      await updateDoc(doc(db, "volunteer_hours", docId), {
        status: "approved",
        approvedAt: new Date(),
        approvedBy: auth.currentUser.uid,
      });
      console.log("Document approved successfully");
      
      // Manually refresh the data
      await refreshData();
      
    } catch (error) {
      console.error("Error approving hours:", error);
      alert("Error approving hours: " + error.message);
    }
  };

  const handleReject = async (docId) => {
    try {
      console.log("Rejecting document:", docId);
      await updateDoc(doc(db, "volunteer_hours", docId), {
        status: "rejected",
        rejectedAt: new Date(),
        rejectedBy: auth.currentUser.uid,
      });
      console.log("Document rejected successfully");
      
      // Manually refresh the data
      await refreshData();
      
    } catch (error) {
      console.error("Error rejecting hours:", error);
      alert("Error rejecting hours: " + error.message);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isAdmin) {
    return <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 pt-24 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 pt-24 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Admin Dashboard</h1>

        {loading ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading pending hours...</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Pending Approvals ({pendingHours.length})</h2>
            {pendingHours.length > 0 ? (
              <div className="space-y-4">
                {pendingHours.map((hour) => (
                  <div key={hour.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-lg font-semibold text-gray-900">{hour.volunteerEmail}</p>
                        <p className="text-sm text-gray-500">{formatDate(hour.timestamp)}</p>
                        <p className="text-xl font-bold mt-2 text-indigo-600">{hour.hours} hours</p>
                      </div>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium border border-slate-300">
                        Pending
                      </span>
                    </div>
                    <p className="text-gray-700 mb-4 p-3 bg-gray-50 rounded border border-gray-100">{hour.details}</p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(hour.id)}
                        className="flex-1 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg font-medium transition duration-200 shadow-sm flex items-center justify-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(hour.id)}
                        className="flex-1 py-2 px-4 bg-white hover:bg-gray-50 text-gray-600 border border-gray-300 rounded-lg font-medium transition duration-200 shadow-sm flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 text-center">
                <p className="text-gray-500">No pending approvals</p>
              </div>
            )}
          </>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition duration-200 shadow-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}