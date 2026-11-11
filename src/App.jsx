import React, { useReducer } from "react";
import { myContext } from "./myContext.jsx";
import { studentReducer } from "./studentReducer.jsx";
import { Routes, Route } from "react-router";

import studentData from "./data.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Students from "./components/Students.jsx";
import AddForm from "./components/AddForm.jsx";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [students, dispatch] = useReducer(studentReducer, studentData.students);


  return (
    <myContext.Provider value={{ students, dispatch, studentData }}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/studentlist" element={<Students />} />
        <Route path="/addstudent" element={<AddForm />} />
      </Routes>
    </myContext.Provider>
  );
};

export default App;
