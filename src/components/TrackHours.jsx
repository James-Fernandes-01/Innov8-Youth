import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import { Link } from "react-router-dom";

export default function TrackHours() {
  const [pendingHours, setPendingHours] = useState([]);
  const [approvedHours, setApprovedHours] = useState([]);
  const [rejectedHours, setRejectedHours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("TrackHours: pendingHours changed:", pendingHours.length);
  }, [pendingHours]);

  useEffect(() => {
    console.log("TrackHours: approvedHours changed:", approvedHours.length);
  }, [approvedHours]);

  useEffect(() => {
    console.log("TrackHours: rejectedHours changed:", rejectedHours.length);
  }, [rejectedHours]);

  const refreshData = async () => {
    if (!auth.currentUser) return;
    
    try {
      console.log("TrackHours: Manually refreshing data");
      const hoursRef = collection(db, "volunteer_hours");
      const q = query(hoursRef, where("volunteerId", "==", auth.currentUser.uid));
      const snapshot = await getDocs(q);
      
      const pending = [];
      const approved = [];
      const rejected = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const hourEntry = {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp),
        };

        if (data.status === "pending") {
          pending.push(hourEntry);
        } else if (data.status === "approved") {
          approved.push(hourEntry);
        } else if (data.status === "rejected") {
          rejected.push(hourEntry);
        }
      });

      console.log("TrackHours: Manual refresh - pending:", pending.length, "approved:", approved.length, "rejected:", rejected.length);
      setPendingHours(pending.sort((a, b) => b.timestamp - a.timestamp));
      setApprovedHours(approved.sort((a, b) => b.timestamp - a.timestamp));
      setRejectedHours(rejected.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error("Error refreshing TrackHours data:", error);
    }
  };

  // Expose refreshData to window for debugging
  useEffect(() => {
    window.refreshTrackHours = refreshData;
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    console.log("TrackHours: Setting up onSnapshot for user hours");

    const hoursRef = collection(db, "volunteer_hours");
    const q = query(hoursRef, where("volunteerId", "==", auth.currentUser.uid));

    console.log("TrackHours: Query created for user:", auth.currentUser.uid);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("TrackHours: onSnapshot fired, docs:", snapshot.docs.length);
      const pending = [];
      const approved = [];
      const rejected = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log("TrackHours Document:", doc.id, data.status);
        const hourEntry = {
          id: doc.id,
          ...data,
          timestamp: data.timestamp?.toDate?.() || new Date(data.timestamp),
        };

        if (data.status === "pending") {
          pending.push(hourEntry);
        } else if (data.status === "approved") {
          approved.push(hourEntry);
        } else if (data.status === "rejected") {
          rejected.push(hourEntry);
        }
      });

      console.log("TrackHours: Setting pending:", pending.length, "approved:", approved.length, "rejected:", rejected.length);
      setPendingHours(pending.sort((a, b) => b.timestamp - a.timestamp));
      setApprovedHours(approved.sort((a, b) => b.timestamp - a.timestamp));
      setRejectedHours(rejected.sort((a, b) => b.timestamp - a.timestamp));
      setLoading(false);
    }, (error) => {
      console.error("TrackHours: onSnapshot error:", error);
    });

    console.log("TrackHours: onSnapshot listener set up");

    return unsubscribe;
  }, [auth.currentUser]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const HourCard = ({ hour, status }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-3 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="text-lg font-semibold text-gray-900">{hour.hours} hours</p>
          <p className="text-sm text-gray-500">{formatDate(hour.timestamp)}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${
            status === "pending"
              ? "bg-slate-100 text-slate-700 border-slate-300"
              : status === "approved"
              ? "bg-slate-200 text-slate-800 border-slate-400"
              : "bg-gray-100 text-gray-700 border-gray-300"
          }`}
        >
          {status === "pending" ? "Pending" : status === "approved" ? "Approved" : "Rejected"}
        </span>
      </div>
      <p className="text-sm text-gray-700 mt-2">{hour.details}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Track Your Hours</h1>

        {loading ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading your hours...</p>
          </div>
        ) : (
          <>
            {/* Pending Hours Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Pending Approval ({pendingHours.length})
              </h2>
              {pendingHours.length > 0 ? (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6">
                  {pendingHours.map((hour) => (
                    <HourCard key={hour.id} hour={hour} status="pending" />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6 text-center">
                  <p className="text-gray-500">No pending hours</p>
                </div>
              )}
            </div>

            {/* Approved Hours Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Approved Hours ({approvedHours.length})
              </h2>
              {approvedHours.length > 0 ? (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6">
                  {approvedHours.map((hour) => (
                    <HourCard key={hour.id} hour={hour} status="approved" />
                  ))}
                  <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <p className="text-center text-lg font-semibold text-slate-800">
                      Total Approved Hours:{" "}
                      <span className="text-slate-900">
                        {approvedHours.reduce((sum, h) => sum + h.hours, 0)}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6 text-center">
                  <p className="text-gray-500">No approved hours yet</p>
                </div>
              )}
            </div>

            {/* Rejected Hours Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-slate-800">
                Rejected Hours ({rejectedHours.length})
              </h2>
              {rejectedHours.length > 0 ? (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6">
                  {rejectedHours.map((hour) => (
                    <HourCard key={hour.id} hour={hour} status="rejected" />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-6 text-center">
                  <p className="text-gray-500">No rejected hours</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Link
                to="/log-hours"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-lg font-medium transition duration-200 shadow-sm"
              >
                Log More Hours
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition duration-200 shadow-sm"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
