import React, { useReducer, useState } from "react";
import { myContext } from "./myContext.jsx";
import { studentReducer } from "./studentReducer.jsx";
import { Routes, Route } from "react-router";

import {
  studentData,
  schedule,
  subjectNames,
  subjectStyles,
  initialNotices,
} from "./data.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Students from "./components/Students.jsx";
import AddForm from "./components/AddForm.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentProfilePage from "./components/StudentProfile.jsx";
import TimeTable from "./components/TimeTable.jsx";
import NoticeBoard from "./components/NoticeBoard.jsx";
import Intro from "./components/Intro.jsx"; // new
import Footer from "./components/Footer.jsx";

// Skip the intro on repeat visits in the same session, and for reduced-motion users
const skipIntro = () =>
  // sessionStorage.getItem("seenIntro") === "1" || change this if want to keep session track
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const App = () => {
  const [students, dispatch] = useReducer(studentReducer, studentData.students);
  const [deleteMsg, setdeleteMsg] = useState(false);
  const [scheduleState, setscheduleState] = useState(schedule);
  const [notices, setNotices] = useState(initialNotices);

  const [showIntro, setShowIntro] = useState(() => !skipIntro()); // new
  const [revealed, setRevealed] = useState(() => skipIntro()); // new

  return (
    <myContext.Provider
      value={{
        students,
        dispatch,
        studentData,
        scheduleState,
        setscheduleState,
        subjectNames,
        subjectStyles,
        deleteMsg,
        setdeleteMsg,
        notices,
        setNotices,
      }}
    >
      {showIntro && (
        <Intro
          onReveal={() => setRevealed(true)}
          onDone={() => setShowIntro(false)}
        />
      )}

      <div
        className={`transition-opacity duration-700 ease-out ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/studentlist" element={<Students />} />
          <Route path="/addstudent" element={<AddForm />} />
          <Route path="/studentlist/:id" element={<StudentProfilePage />} />
          <Route path="/timetable" element={<TimeTable />} />
          <Route path="/noticeboard" element={<NoticeBoard />} />
        </Routes>
        <Footer/>
      </div>
    </myContext.Provider>
  );
};

export default App;
