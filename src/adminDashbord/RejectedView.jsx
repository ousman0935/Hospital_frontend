import React, { useState, useEffect } from "react";

const RejectedView = () => {
  // Keep all your states (for future use), but prefix unused with _
  const [_hospitals, setHospitals] = useState([]);
  const [_doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [_stats, setStats] = useState({ totalAppointments: 0, totalDoctors: 0, totalHospitals: 0 });
  const [_filters, _setFilters] = useState({ date: "", doctorId: "", userId: "", hospitalId: "", status: "" });

  // Load data
  useEffect(() => {
    async function loadAll() {
      try {
        const hospitalsData = [
          { _id: "h1", name: "Kedir Hospital", email: "kedir@hosp.local", address: "Addis Ababa" },
          { _id: "h2", name: "Rabia Clinic", email: "rabia@clinic.local", address: "Bole" }
        ];
        setHospitals(hospitalsData);

        const doctorsData = [
          { _id: "d1", name: "Dr. John", specialization: "Cardiologist", hospitalId: "h1", phone: "0911111111" },
          { _id: "d2", name: "Dr. Sara", specialization: "Dentist", hospitalId: "h2", phone: "0912222222" }
        ];
        setDoctors(doctorsData);

        const appointmentsData = [
          { _id: "a1", date: "2025-12-01T10:00:00Z", user: { _id: "u1", name: "Musa" }, doctorId: "d1", hospitalId: "h1", status: "success", reason: "Checkup" },
          { _id: "a2", date: "2025-12-02T12:00:00Z", user: { _id: "u2", name: "Amina" }, doctorId: "d2", hospitalId: "h2", status: "rejected", reason: "Tooth pain" }
        ];
        setAppointments(appointmentsData);

        setStats({ totalAppointments: appointmentsData.length, totalDoctors: doctorsData.length, totalHospitals: hospitalsData.length });
      } catch (err) {
        console.error("load error", err);
      }
    }
    loadAll();
  }, []);

  // Derived list
  const rejectedAppointments = appointments.filter(a => a.status === "rejected");

  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-3">Rejected Appointments</h2>
      <div className="space-y-2">
        {rejectedAppointments.map(r => (
          <div key={r._id} className="border p-3 rounded flex items-center justify-between">
            <div>
              <div className="font-medium">{r.user?.name}</div>
              <div className="text-sm text-slate-500">{formatDate(r.date)} • {r.reason}</div>
            </div>
            <div>
              <button
                className="px-2 py-1 rounded border text-sm"
                onClick={() => console.log("review reject", r._id)}
              >
                Review
              </button>
            </div>
          </div>
        ))}
        {rejectedAppointments.length === 0 && (
          <div className="text-sm text-slate-500">No rejected appointments.</div>
        )}
      </div>
    </div>
  );

  // Format date function
  function formatDate(d) {
    try {
      return new Date(d).toLocaleString();
    } catch (e) {
      return d;
    }
  }
};

export default RejectedView;