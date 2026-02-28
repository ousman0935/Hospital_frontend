import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, CalendarDays,  AlertCircle } from "lucide-react";
const days = [
  { id: 0, name: "Sunday" },
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
];


export default function DoctorAvailabilityPage() {
const [schedule, setSchedule] = useState(
  days.map((day) => ({
    dayId: day.id,      // number (for MongoDB)
    dayName: day.name,  // string (for UI)
    enabled: day.id !== 0,
    start: "08:00",
    end: "16:00",
    breaks: [],
  }))
);


  const [slotDuration, setSlotDuration] = useState(60);
  
  const [exceptions, setExceptions] = useState([]);

  // Update day
  const updateDay = (index, key, value) => {
    const updated = [...schedule];
    updated[index][key] = value;
    setSchedule(updated);
  };

  // Break functions
  const addBreak = (index) => {
    const updated = [...schedule];
    updated[index].breaks.push({ start: "12:00", end: "13:00" });
    setSchedule(updated);
  };
  const updateBreak = (dayIndex, breakIndex, key, value) => {
    const updated = [...schedule];
    updated[dayIndex].breaks[breakIndex][key] = value;
    setSchedule(updated);
  };
  const removeBreak = (dayIndex, breakIndex) => {
    const updated = [...schedule];
    updated[dayIndex].breaks.splice(breakIndex, 1);
    setSchedule(updated);
  };

  // Exceptions
  const addException = () => setExceptions([...exceptions, { date: "", start: "08:00", end: "16:00", reason: "" }]);
  const updateException = (index, key, value) => {
    const updated = [...exceptions];
    updated[index][key] = value;
    setExceptions(updated);
  };
  const removeException = (index) => {
    const updated = [...exceptions];
    updated.splice(index, 1);
    setExceptions(updated);
  };
 const handleSubmit = (e) => {
  e.preventDefault();
  console.log(schedule);
};


 return (
  <div className="min-h-screen bg-slate-100 p-2 space-y-2 text-sm">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center"
    >
      <div>
        <h1 className="text-lg font-semibold text-slate-800">
          Availability
        </h1>
        <p className="text-sm text-slate-500">
          Manage booking schedule
        </p>
      </div>
    </motion.div>

    {/* AI Suggestion + Appointment Duration */}
    <div className="grid grid-cols-2 gap-2">

      <div className="bg-white border rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
        <AlertCircle size={18} className="text-blue-500" />
        <span className="text-sm text-slate-600">
          AI: Optimal slots this week
        </span>
      </div>

      <div className="bg-white border rounded-xl px-3 py-2 flex items-center gap-2 shadow-sm">
        <Clock size={18} className="text-slate-500" />
        <span className="text-sm text-slate-600">
          Duration
        </span>
        <select
          value={slotDuration}
          onChange={(e) => setSlotDuration(Number(e.target.value))}
          className="ml-auto border rounded-lg px-2 py-1 text-sm"
        >
          <option value={15}>15 min</option>
          <option value={30}>30 min</option>
          <option value={60}>60 min</option>
        </select>
      </div>
    </div>

    {/* ================= WEEKLY AVAILABILITY FORM ================= */}
    <form className="bg-white border rounded-2xl p-3 space-y-2 shadow-sm">

      <div className="flex items-center gap-2 mb-1">
        <CalendarDays size={18} className="text-indigo-600" />
        <h2 className="text-sm font-semibold text-slate-800">
          Weekly Availability
        </h2>
      </div>

      <div className="grid gap-1">
        {schedule.map((d, i) => (
          <div
            key={d.dayId}
            className={`grid grid-cols-[auto_90px_auto_auto_auto_auto] items-center gap-2 
            px-2 py-1.5 rounded-lg border text-sm
            ${d.enabled
                ? "bg-slate-50"
                : "bg-slate-100 opacity-60"
              }`}
          >
            <input
              type="checkbox"
              checked={d.enabled}
              onChange={(e) =>
                updateDay(i, "enabled", e.target.checked)
              }
              className="w-4 h-4"
            />

            <span className="font-medium text-slate-700">
              {d.dayName}
            </span>

            <input
              type="time"
              disabled={!d.enabled}
              value={d.start}
              onChange={(e) =>
                updateDay(i, "start", e.target.value)
              }
              className="border rounded-md px-2 py-1 text-sm"
            />

            <span className="text-slate-400">-</span>

            <input
              type="time"
              disabled={!d.enabled}
              value={d.end}
              onChange={(e) =>
                updateDay(i, "end", e.target.value)
              }
              className="border rounded-md px-2 py-1 text-sm"
            />

            <button
              type="button"
              onClick={() => addBreak(i)}
              disabled={!d.enabled}
              className="text-indigo-600 text-sm"
            >
              +Break
            </button>

            {/* Breaks Inline */}
            {d.breaks.length > 0 && (
              <div className="col-span-full flex flex-wrap gap-1 ml-5 mt-1">
                {d.breaks.map((b, bi) => (
                  <div
                    key={bi}
                    className="flex items-center gap-1 bg-white border px-2 py-1 rounded-md text-sm"
                  >
                    <input
                      type="time"
                      value={b.start}
                      onChange={(e) =>
                        updateBreak(i, bi, "start", e.target.value)
                      }
                      className="border rounded px-1 py-0.5 text-sm"
                    />
                    <span>-</span>
                    <input
                      type="time"
                      value={b.end}
                      onChange={(e) =>
                        updateBreak(i, bi, "end", e.target.value)
                      }
                      className="border rounded px-1 py-0.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeBreak(i, bi)}
                      className="text-red-500 text-sm"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Primary Button */}
      <div className="flex justify-end pt-1">
        <button
        onClick={handleSubmit}
          type="submit"
          className="bg-indigo-600 text-white px-5 py-2 text-base rounded-lg shadow hover:scale-105 transition"
        >
          Save Weekly
        </button>
      </div>
    </form>

    {/* ================= EXCEPTIONS FORM ================= */}
    <form className="bg-white border rounded-2xl p-3 space-y-2 shadow-sm">

      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-semibold text-slate-800">
          Exceptions
        </h2>

        <button
          type="button"
          onClick={addException}
          className="text-blue-600 text-sm"
        >
          + Add
        </button>
      </div>

      {exceptions.map((ex, ei) => (
        <div
          key={ei}
          className="flex flex-wrap items-center gap-2 bg-slate-50 border px-2 py-1 rounded-lg text-sm"
        >
          <input
            type="date"
            value={ex.date}
            onChange={(e) =>
              updateException(ei, "date", e.target.value)
            }
            className="border rounded-md px-2 py-1 text-sm"
          />

          <input
            type="time"
            value={ex.start}
            onChange={(e) =>
              updateException(ei, "start", e.target.value)
            }
            className="border rounded-md px-2 py-1 text-sm"
          />

          <span>-</span>

          <input
            type="time"
            value={ex.end}
            onChange={(e) =>
              updateException(ei, "end", e.target.value)
            }
            className="border rounded-md px-2 py-1 text-sm"
          />

          <input
            type="text"
            placeholder="Reason"
            value={ex.reason}
            onChange={(e) =>
              updateException(ei, "reason", e.target.value)
            }
            className="border rounded-md px-2 py-1 text-sm flex-1 min-w-[100px]"
          />

          <button
            type="button"
            onClick={() => removeException(ei)}
            className="text-red-500 text-sm"
          >
            x
          </button>
        </div>
      ))}

      {/* Secondary Button */}
      <div className="flex justify-end pt-1">
        <button
          type="submit"
          className="border border-indigo-600 text-indigo-600 px-5 py-2 text-base rounded-lg shadow hover:bg-indigo-50 transition"
        >
          Save Exceptions
        </button>
      </div>
    </form>
  </div>
);


}
