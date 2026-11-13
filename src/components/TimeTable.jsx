import { useContext, useState } from "react";
import { Link } from "react-router";
import TimeTableForm from "./TimeTableForm";
import { myContext } from "../myContext";

/* UI only: static sample data. Replace `schedule` with your real data later. */

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Each slot is either a class or a break row.
const slots = [
  { id: 1, time: "9:00 – 10:00" },
  { id: 2, time: "10:00 – 11:00" },
  { id: 3, time: "11:00 – 12:00" },
  { id: "break", time: "12:00 – 1:00", label: "Lunch Break" },
  { id: 4, time: "1:00 – 2:00" },
  { id: 5, time: "2:00 – 3:00" },
  { id: 6, time: "3:00 – 4:00" },
];

function ClassCell({ item, subjectStyles }) {
  if (!item) {
    return <span className="block text-center text-gray-300">—</span>;
  }
  return (
    <div
      className={`rounded-lg border p-2.5 ${subjectStyles[item.subject]} transition hover:shadow-sm`}
    >
      <p className="text-sm font-semibold">{item.subject}</p>

      <p className="text-xs opacity-80">{item.teacher}</p>
    </div>
  );
}

export default function TimeTable() {
  // Highlights today's column (Mon = 1 ... Sat = 6). Sunday highlights nothing.
  const { scheduleState, setscheduleState, subjectNames, subjectStyles, studentData } =
    useContext(myContext);

  function handleEditTimeTable(form, state = scheduleState) {
    const { year, day, period, subject, teacher } = form;
    setscheduleState({
      ...state,
      [year]: {
        ...state[year],
        [day]: {
          ...state[year][day],
          [period]: { subject, teacher }, // overwrites just this period
        },
      },
    });
  }

  const todayIndex = new Date().getDay() - 1;
  const todayName = days[todayIndex];

  const [editTimeTable, seteditTimeTable] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1st");

  if (editTimeTable) {
    return (
      <TimeTableForm
        onClose={() => seteditTimeTable(false)}
        subjectNames={subjectNames}
        days={days}
        slots={slots}
        handleEditTimeTable={handleEditTimeTable}
        teachers={studentData.faculty}
      />
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Link
            to="/studentlist"
            className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            ← Back to students
          </Link>

          {/* Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Time Table</h1>
              <p className="mt-1 text-sm text-gray-500">
                Weekly class schedule
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                defaultValue="1st"
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15"
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="1st">B.Tech CSE · 1st year</option>
                <option value="2nd">B.Tech CSE · 2nd year</option>
                <option value="3rd">B.Tech CSE · 3rd year</option>
                <option value="4th">B.Tech CSE · 4th year</option>
              </select>
              <button
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                onClick={() => seteditTimeTable(true)}
              >
                Edit
              </button>
            </div>
          </div>

          {/* Timetable grid */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="w-32 border-b border-gray-200 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Time
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className={`border-b border-gray-200 px-3 py-3 text-xs font-semibold uppercase tracking-wide ${
                          day === todayName
                            ? "bg-indigo-50 text-indigo-700"
                            : "text-gray-500"
                        }`}
                      >
                        {day}
                        {day === todayName && (
                          <span className="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-medium normal-case text-white">
                            Today
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {slots.map((slot) =>
                    slot.id === "break" ? (
                      <tr key="break">
                        <td className="border-b border-gray-100 px-4 py-3 text-xs font-medium text-gray-500">
                          {slot.time}
                        </td>
                        <td
                          colSpan={days.length}
                          className="border-b border-gray-100 bg-gray-50 py-3 text-center text-xs font-semibold uppercase tracking-widest text-gray-400"
                        >
                          {slot.label}
                        </td>
                      </tr>
                    ) : (
                      <tr key={slot.id}>
                        <td className="border-b border-gray-100 px-4 py-3 align-middle">
                          <p className="text-xs font-semibold text-gray-700">
                            Period {slot.id}
                          </p>
                          <p className="text-xs text-gray-400">{slot.time}</p>
                        </td>
                        {days.map((day) => (
                          <td
                            key={day}
                            className={`border-b border-gray-100 px-2 py-2 align-top ${
                              day === todayName ? "bg-indigo-50/40" : ""
                            }`}
                          >
                            <ClassCell
                              item={
                                scheduleState[selectedClass][day]?.[slot.id]
                              }
                              subjectStyles={subjectStyles}
                            />
                          </td>
                        ))}
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-gray-900">
              Subjects
            </h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(subjectStyles).map((key) => (
                <span
                  key={key}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${subjectStyles[key]}`}
                >
                  {key} · {subjectNames[key]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
