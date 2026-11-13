import React, { useState, useContext } from "react";
import { myContext } from "../myContext";
import { NavLink } from "react-router";
import { useNavigate } from "react-router";

export default function AddForm() {
    const { studentData } = useContext(myContext);
    
  const inputCls =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

  const { dispatch } = useContext(myContext);
  let navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    rollNo: "",
    department: "",
    course: "",
    year: "",
  });
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Add New Student</h2>
          
        </div>

        <form className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Full name
            </span>
            <input
              className={inputCls}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Aarav Sharma"
            />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </span>
              <input
                type="email"
                className={inputCls}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@example.com"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                RollNo (Required)
              </span>
              <input
                className={inputCls}
                onChange={(e) => setForm({ ...form, rollNo: e.target.value })}
               
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Phone (optional)
              </span>
              <input
                className={inputCls}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="10 digits"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-gray-700">
              Department
            </span>
            <select
              className={inputCls}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            >
              <option>Select department</option>
                {studentData.departments.map((d, i) => (
                  <option key={i}>{d.departmentName}</option>
                ))}
            </select>
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Course
              </span>
              <select
                className={inputCls}
                onChange={(e) => setForm({ ...form, course: e.target.value })}
              >
                <option>Select course</option>
                {studentData.courses.map((c, i) => (
                  <option key={i}>{c.courseName}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-gray-700">
                Year
              </span>
              <select
                className={inputCls}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              >
                <option>Select year</option>
                {studentData.years.map((y, i) => (
                  <option key={i}>{y}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <NavLink
              to="/studentlist"
              type="button"
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </NavLink>
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "ADD", payload: form });
                navigate("/studentlist");
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
