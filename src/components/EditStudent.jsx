import { useContext, useState } from "react";
import { Link, useParams } from "react-router";
import { myContext } from "../myContext";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";

export default function EditStudent({ setedit, student }) {
  const { id } = useParams();
  const {dispatch} = useContext(myContext);

  // UI only: static starting values. Later, replace with the real student
  // found by `id` (from your data array or API).
  const [form, setForm] = useState(student);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // No saving logic yet (UI only).
  };

  const initials = form.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
 console.log(form)
  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-lg shadow-gray-200/60 sm:p-8">
        <button
          onClick={() => {
            setedit(false);
          }}
          className="mb-4 inline-block text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← Back to profile
        </button>

        <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>
        <p className="mb-6 mt-1 text-sm text-gray-500">
          Update the student's details below.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="mb-6 flex items-center gap-4">
            <div className="grid h-[72px] w-[72px] place-items-center rounded-full bg-indigo-100 text-2xl font-semibold text-indigo-600">
              {initials}
            </div>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className={labelClass}>
                Full name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => handleChange(e)}
                placeholder="Enter full name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange(e)}
                placeholder="name@example.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange(e)}
                placeholder="10-digit number"
                className={inputClass}
              />
            </div>
            

            <div>
              <label htmlFor="course" className={labelClass}>
                Course
              </label>
              <input
                id="course"
                name="course"
                value={form.course}
                onChange={handleChange}
                placeholder="e.g. B.Tech CSE"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="year" className={labelClass}>
                Year
              </label>
              <select
                id="year"
                name="year"
                value={form.year}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="1st">1st year</option>
                <option value="2nd">2nd year</option>
                <option value="3rd">3rd year</option>
                <option value="4th">4th year</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              onClick={() => {
                setedit(false);
              }}
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "UPDATE", payload: form });
                setedit(false);
              }}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
