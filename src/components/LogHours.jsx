import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function LogHours() {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      await addDoc(collection(db, "volunteer_hours"), {
        volunteerEmail: auth.currentUser.email,
        volunteerId: auth.currentUser.uid,
        date: date,
        hours: Number(hours),
        details: details,
        status: "pending",
        timestamp: new Date()
      });
      navigate("/track-hours");
    } catch (error) {
      setError("Error submitting hours. Please try again.");
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 pt-24 px-4 pb-20">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-900">Log Your Volunteer Hours</h2>
          <p className="text-center text-gray-600 mb-6">Submit your volunteer hours for approval</p>
          


          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Hours Volunteered</label>
              <input
                type="number"
                placeholder="e.g., 2.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                step="0.5"
                min="0"
                max="24"
                required
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Details/Description</label>
              <textarea
                placeholder="Describe the work you did..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
                rows="5"
                className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition resize-none"
              />
            </div>

            {error && <p className="text-rose-600 text-sm text-center bg-rose-50 p-2 rounded border border-rose-200">{error}</p>}

            <button
              type="submit"
              className="w-full mt-6 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 font-bold rounded-lg transition duration-200 shadow-sm"
            >
              Submit for Approval
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition duration-200 shadow-sm"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}