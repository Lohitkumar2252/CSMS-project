export default function DashboardCard({ value, label, icon, iconBg }) {

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            {value}
          </p>
        </div>
        
        <div className={`rounded-xl p-3 ${iconBg}`}>
          {icon}
        </div>
      </div>    
    </div>
  );
}
