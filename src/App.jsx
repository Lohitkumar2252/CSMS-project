import React, { useReducer, useState } from "react";
import { myContext } from "./myContext.jsx";
import { studentReducer } from "./studentReducer.jsx";
import { Routes, Route } from "react-router";

import studentData from "./data.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Students from "./components/Students.jsx";
import AddForm from "./components/AddForm.jsx";
import Navbar from "./components/Navbar.jsx";
import StudentProfilePage from "./components/StudentProfile.jsx";

const App = () => {
  const [students, dispatch] = useReducer(studentReducer, studentData.students);
  const [deleteMsg, setdeleteMsg] = useState(false);

  return (
    <myContext.Provider value={{ students, dispatch, studentData, deleteMsg, setdeleteMsg }}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/studentlist" element={<Students />} />
        <Route path="/addstudent" element={<AddForm />} />
        <Route path="/studentlist/:id" element={<StudentProfilePage />} />
      </Routes>
    </myContext.Provider>
  );
};

export default App;
