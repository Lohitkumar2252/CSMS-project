import { useContext, useState } from "react";
import { Link } from "react-router";
import NoticeForm from "./NoticeForm";
import { myContext } from "../myContext";


/* Sample data. Replace with your real notices later (e.g. from context). */


export default function NoticeBoard() {
  const {notices, setNotices} = useContext(myContext);
  
  const [openId, setOpenId] = useState(null); // which notice is expanded
  const [showForm, setShowForm] = useState(false);

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
  };

  const handleView = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const handleAdd = (data) => {
    const newNotice = {
      id: Date.now(),
      ...data,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }), // e.g. "13 Nov 2026"
    };
    setNotices([newNotice, ...notices]); // newest first
    setShowForm(false);
  };

  if (showForm) {
    return <NoticeForm orm onAdd={handleAdd} onClose={() => setShowForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/studentlist"
          className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          ← Back to students
        </Link>

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
            <p className="mt-1 text-sm text-gray-500">
              Latest announcements for students
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="shrink-0 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            + Add notice
          </button>
        </div>

        {notices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
            <p className="text-sm font-medium text-gray-700">No notices</p>
            <p className="mt-1 text-sm text-gray-400">
              Nothing has been posted yet.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {notices.map((notice) => (
              <li
                key={notice.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="text-base font-semibold text-gray-900">
                      {notice.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-400">
                      {notice.postedBy} · {notice.date}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-2">
                    <button
                      type="button"
                      onClick={() => handleView(notice.id)}
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      {openId === notice.id ? "Hide" : "View"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(notice.id)}
                      className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {openId === notice.id && (
                  <p className="mt-4 whitespace-pre-line border-t border-gray-100 pt-4 text-sm leading-relaxed text-gray-600">
                    {notice.body}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}