const developers = ["B. Lohit Kumar", "Aditya Prasad Dash"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex items-center justify-between px-6 py-6 max-w-6xl text-left">
        {/* Brand */}
        <div className="flex flex-col sm:flex-row items-start gap-1 sm:gap-3">
          <p className="text-sm font-semibold text-gray-900">Tech Bridge</p>
          <p className="text-xs text-gray-500">GKCET · CSE Department</p>
        </div>

        {/* Credits */}
        <div className="text-xs text-gray-500">
          <p>
            Built By{" "}
            <span className="font-medium text-gray-700">{developers[0]}</span>
          </p>
          <p>
            Presented By{" "}
            <span className="font-medium text-gray-700">{developers[1]}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
