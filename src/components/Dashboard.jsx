import React from "react";
import { useContext } from "react";
import { myContext } from "../myContext.jsx";
import DashboardCard from "./DashboardCard.jsx";
import RecentNotices from "./RecentNotices.jsx";
import FacultyCard from "./FacultyCard.jsx";


/* ---------- Icons (inline SVG, no extra dependencies) ---------- */
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  fill: "none",
  viewBox: "0 0 24 24",
  strokeWidth: 1.8,
  stroke: "currentColor",
  className: "h-6 w-6",
  "aria-hidden": true,
};

const StudentsIcon = () => (
  <svg {...iconProps}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.26 10.147a60.436 60.436 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
    />
  </svg>
);

const FacultyIcon = () => (
  <svg {...iconProps}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const CoursesIcon = () => (
  <svg {...iconProps}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
    />
  </svg>
);

/* ---------- Sub-components ---------- */

/* ---------- Main component ---------- */
export default function Dashboard() {
  const { students, studentData, notices } = useContext(myContext);

  const cardData = [
    {
      label: "Total Students",
      value: students.length,
      icon: StudentsIcon(),
      iconBg: "bg-[#b9cdf8]",
    },
    {
      label: "Total Faculty",
      value: studentData.faculty.length,
      icon: FacultyIcon(),
      iconBg: "bg-[#b5fde6]",
    },
    {
      label: "Total Notices",
      value: notices.length,
      icon: CoursesIcon(),
      iconBg: "bg-[#fbceb6]",  
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Overview
          </h1>
        </header>

        {/* Stats */}

        <section
          aria-label="Key metrics"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cardData.map((card, index) => (
            <DashboardCard
              key={index}
              value={card.value}
              label={card.label}
              icon={card.icon}
              iconBg={card.iconBg}
            />
          ))}
        </section>
        <div className="faculty mt-10">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-2xl capitalize mb-4">
            Faculty
          </h2>
          <div className="facultyContainer w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {studentData.faculty.map((e) => {
              return (
                <FacultyCard
                  key={e.facultyName}
                  name={e.facultyName}
                  designation={e.facultyDesignation}
                  photo={e.photo}
                />
              );
            })}
          </div>
        </div>

        {/* Recent activities */}
        <RecentNotices notices={notices} />
        
      </div>
    </div>
  );
}
