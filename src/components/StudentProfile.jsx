import React from "react";
import { DeleteConfimationMsg } from "./DeleteConfimationMsg";

/* UI only: no state, context or handlers.
   Pass a `student` prop; the default below is just placeholder data for layout. */

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

function InfoItem({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900">{value || "—"}</dd>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function StudentProfilePage({ student, setselectedStudent }) {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          className="mb-6 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          onClick={() => {
            setselectedStudent(null);
          }}
        >
          ← Back to students
        </button>
        {/* Header card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-500 sm:h-28" />
          <div className="px-6 pb-6">
            <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-4 border-white bg-indigo-100 text-2xl font-semibold text-indigo-700 sm:h-24 sm:w-24 sm:text-3xl">
                  {initials(student.name)}
                </div>
                <div className="pb-1">
                  <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    {student.name}
                  </h1>
                  <p className="text-sm text-gray-500">
                    {student.department} · {student.year} year
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Edit
                </button>
                <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 ">
          {/* Left column */}
          <div className="space-y-6 ">
            <Card title="Personal information">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <InfoItem label="Full name" value={student.name} />
                <InfoItem label="Email" value={student.email} />
                <InfoItem label="Phone" value={student.phone} />
                <InfoItem label="Address" value={student.address} />
              </dl>
            </Card>

            <Card title="Academic information">
              <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                <InfoItem label="Roll number" value={student.rollNo} />
                <InfoItem label="Department" value={student.department} />
                <InfoItem label="Primary course" value={student.course} />
                <InfoItem label="Year" value={`${student.year} year`} />
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
