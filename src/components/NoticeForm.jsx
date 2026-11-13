import { useState } from "react";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15";
const labelClass = "mb-1.5 block text-sm font-semibold text-gray-700";

const MAX_BODY = 500;

export default function NoticeForm({ onAdd, onClose }) {
  const [form, setForm] = useState({
    title: "",
    body: "",
    postedBy: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      title: form.title.trim(),
      body: form.body.trim(),
      postedBy: form.postedBy.trim(),
    });
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-lg shadow-gray-200/60 sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="mb-4 inline-block text-sm text-gray-500 transition hover:text-gray-900"
        >
          ← Back to notices
        </button>

        <h1 className="text-2xl font-bold text-gray-900">Add Notice</h1>
        <p className="mb-6 mt-1 text-sm text-gray-500">
          Write a new announcement for students. Today's date is added
          automatically.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className={labelClass}>
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Mid-semester exam schedule released"
              maxLength={100}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="body" className={labelClass}>
              Notice details
            </label>
            <textarea
              id="body"
              name="body"
              rows="6"
              value={form.body}
              onChange={handleChange}
              placeholder="Write the full announcement here..."
              maxLength={MAX_BODY}
              required
              className={`${inputClass} resize-y max-h-80`}
            />
            <p className="mt-1 text-right text-xs text-gray-400 ">
              {form.body.length}/{MAX_BODY}
            </p>
          </div>

          <div>
            <label htmlFor="postedBy" className={labelClass}>
              Posted by
            </label>
            <input
              id="postedBy"
              name="postedBy"
              value={form.postedBy}
              onChange={handleChange}
              placeholder="e.g. Examination Cell"
              required
              className={inputClass}
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
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
            >
              Post notice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
