import { Link } from "react-router";

/* Dashboard card showing the latest notices.
   Usage:  <RecentNotices notices={notices} />
   Notices are expected newest-first (same order as NoticeBoard).
   Falls back to the sample data below until you pass real notices. */



export default function RecentNotices({ notices , limit = 3 }) {
  const latest = notices.slice(0, limit);

  return (
    <section className="rounded-2xl mt-10 border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl capitalize   font-bold    text-gray-900">
          Recent notices
        </h2>
        <Link
          to="/noticeboard"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          View all →
        </Link>
      </div>

      {latest.length === 0 ? (
        <p className="mt-6 py-6 text-center text-sm text-gray-400">
          No notices yet.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-100">
          {latest.map((notice) => (
            <li key={notice.id} className="py-4 first:pt-0 last:pb-0">
              <Link to="/noticeboard" className="group block">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold text-gray-900 transition group-hover:text-indigo-600">
                    {notice.title}
                  </h3>
                  <span className="shrink-0 text-xs text-gray-400">
                    {notice.date}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-gray-600">
                  {notice.body}
                </p>
                <p className="mt-1.5 text-xs text-gray-400">
                  {notice.postedBy}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
