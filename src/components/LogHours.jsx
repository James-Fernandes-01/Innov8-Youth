import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";

export default function LogHours() {
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [details, setDetails] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await addDoc(collection(db, "volunteer_hours"), {
        volunteerEmail: auth.currentUser.email,
        volunteerId: auth.currentUser.uid,
        date: date,
        hours: Number(hours),
        details: details,
        status: "pending", // Important: Sent for admin approval
        timestamp: new Date()
      });
      alert("Hours submitted for approval!");
      setDate(""); setHours(""); setDetails("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log Your Volunteer Hours</h2>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <input type="number" placeholder="Hours" value={hours} onChange={e => setHours(e.target.value)} required />
      <textarea placeholder="Details/Description" value={details} onChange={e => setDetails(e.target.value)} required />
      <button type="submit">Submit for Approval</button>
    </form>
  );
}