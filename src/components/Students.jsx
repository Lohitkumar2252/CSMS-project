import React, { useState } from "react";
import { useContext } from "react";
import { myContext } from "../myContext.jsx";
import StudentProfilePage from "./StudentProfile.jsx";
import { DeleteConfimationMsg } from "./DeleteConfimationMsg.jsx";
import { NavLink } from "react-router";

const inputCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

const initials = (name) =>
  name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

function Avatar({ name, large = false }) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700 ${
        large ? "h-20 w-20 text-2xl" : "h-10 w-10 text-sm"
      }`}
    >
      {initials(name)}
    </div>
  );
}

/* ---------- 1. Student list page (search + filters + table) ---------- */
export function StudentList() {
  const { students, studentData } = useContext(myContext);

  const [selectedStudent, setselectedStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All departments");
  const [course, setCourse] = useState("All courses");
  const [year, setYear] = useState("All years");
  console.log(students);
  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const matchesDepartment =
      department === "All departments" || s.department === department;
    const matchesCourse = course === "All courses" || s.course === course;
    const matchesYear = year === "All years" || String(s.year) === year;
    return matchesSearch && matchesDepartment && matchesCourse && matchesYear;
  });

  const departments = [...new Set(students.map((s) => s.department))];
  const courses = [...new Set(students.map((s) => s.course))];
  const years = [...new Set(students.map((s) => s.year))];

  if (selectedStudent) {
    return (
      <StudentProfilePage
        student={selectedStudent}
        setselectedStudent={setselectedStudent}
        
      />
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Student Management
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                {students.length} of {studentData.students.length} students
              </p>
            </div>
            <NavLink
              to="/addstudent"
              className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
            >
              + Add student
            </NavLink>
          </header>

          <div className="mb-6 grid grid-cols-1 gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5">
            <input
              className={`${inputCls} lg:col-span-2`}
              placeholder="Search by name"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <select
              className={inputCls}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
            >
              <option>All departments</option>
              {departments.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select
              className={inputCls}
              onChange={(e) => {
                setCourse(e.target.value);
              }}
            >
              <option>All courses</option>
              {courses.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              className={inputCls}
              onChange={(e) => {
                setYear(e.target.value);
              }}
            >
              <option>All years</option>
              {years.map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Student</th>
                    <th className="px-6 py-3 font-medium">Department</th>
                    <th className="px-6 py-3 font-medium">Course</th>
                    <th className="px-6 py-3 font-medium">Year</th>
                    <th className="px-6 py-3 text-right font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-6 py-10 text-center text-gray-500"
                      >
                        No students match your filters.
                      </td>
                    </tr>
                  )}
                  {filteredStudents.map((s) => (
                    <tr key={s.rollNo} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={s.name} />
                          <div>
                            <p className="font-medium text-gray-900">
                              {s.name}
                            </p>
                            <p className="text-xs text-gray-500">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {s.department}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{s.course}</td>
                      <td className="px-6 py-4 text-gray-700">{s.year}</td>
                      <td className="whitespace-nowrap px-6 py-4 text-right">
                        <button
                          className="font-medium text-gray-600 hover:text-gray-900  mr-3"
                          onClick={() => setdeleteStudent(s)}
                        >
                          Delete
                        </button>
                        <button className="mr-3 font-medium text-gray-600 hover:text-gray-900">
                          Edit
                        </button>
                        <button
                          className="mr-3 font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setselectedStudent(s)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* ---------- 2. Add / Edit student modal ---------- */

/* ---------- 3. Delete confirmation modal ---------- */

/* ---------- 4. Student profile page ---------- */

export default StudentList;
