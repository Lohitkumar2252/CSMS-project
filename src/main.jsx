import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import EditStudent from "./components/EditStudent.jsx";
import TimeTable from "./components/TimeTable.jsx";
import TimeTableForm from "./components/TimeTableForm.jsx";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>,
);
