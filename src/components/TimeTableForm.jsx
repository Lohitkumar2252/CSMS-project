import { useState } from "react";

/* UI only: one form for both "Add class" and "Edit class".
   - Add mode:  <TimeTableForm onClose={() => setShowForm(false)} />
   - Edit mode: <TimeTableForm entry={selectedClass} onClose={() => setShowForm(false)} />
   Saving and deleting are not wired up yet. */

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";

export default function TimeTableForm({
  onClose,
  subjectNames,
  days,
  slots,
  handleEditTimeTable,
}) {
  
  const [form, setForm] = useState({
    subject: "",
    teacher: "",
    period: "",
    day: "",
    year: "",
  });
  const subjects = Object.keys(subjectNames);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-lg shadow-gray-200/60 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 inline-block text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← Back to time table
        </button>

        <h1 className="text-2xl font-bold text-gray-900">
         Edit Schedule
        </h1>
        <p className="mb-6 mt-1 text-sm text-gray-500">
         
        </p>

        <form>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Subject */}
            <div className="sm:col-span-2">
              <label htmlFor="subject" className={labelClass}>
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={(e) => handleChange(e)}
                className={inputClass}
              >
                <option value="" disabled>
                  Select a subject
                </option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Teacher */}
            <div>
              <label htmlFor="teacher" className={labelClass}>
                Teacher
              </label>
              <input
                id="teacher"
                name="teacher"
                value={form.teacher}
                onChange={(e) => handleChange(e)}
                placeholder="e.g. Dr. Mishra"
                className={inputClass}
              />
            </div>

            {/* Day */}
            <div>
              <label htmlFor="day" className={labelClass}>
                Day
              </label>
              <select
                id="day"
                name="day"
                value={form.day}
                onChange={(e) => handleChange(e)}
                className={inputClass}
              >
                <option>
                    Select Day
                  </option>
                {days.map((d) => (
                  
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Period */}
            <div>
              <label htmlFor="period" className={labelClass}>
                Period
              </label>
              <select
                id="period"
                name="period"
                value={form.period}
                onChange={(e) => handleChange(e)}
                className={inputClass}
              >
                 <option>
                    Select period
                  </option>
                {slots.map((p) => {
                  if (p.id === "break") return null;
                  return (
                    <option key={p.id} value={p.id}>
                      {p.id}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Year */}
            <div>
              <label htmlFor="year" className={labelClass}>
                Year
              </label>
              <select
                id="year"
                name="year"
                value={form.year}
                onChange={(e) => handleChange(e)}
                className={inputClass}
              >
                 <option>
                    Select Year
                  </option>
                <option value="1st">1st year</option>
                <option value="2nd">2nd year</option>
                <option value="3rd">3rd year</option>
                <option value="4th">4th year</option>
              </select>
            </div>
          </div>
          

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
            
            <div className="flex flex-col-reverse gap-3 sm:ml-auto sm:flex-row">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                onClick={(e)=>{
                  e.preventDefault();
                  handleEditTimeTable(form);
                  onClose();
                }}
              >
                Save
              </button>
                {console.log(form)}
            </div>
          </div>
        </form>
      </div>
    </div>
  );

}
