export default function FacultyCard({ name, designation, photo }) {
  
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      {/* Banner + avatar */}
      <div className="h-16 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="-mt-8 px-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-indigo-100 overflow-hidden">
          <img src={photo} alt="image" className="object-cover w-full h-full object-top" />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        {/* Name + role */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-gray-900">
              {name}
            </h3>
            <p className="text-sm text-gray-500">{designation}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
