import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthProvider } from "./firebase/auth";
import { DepartmentCourseProvider } from "pages/user/userComponent/DepartmentCourseContext";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
   <DepartmentCourseProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
    </DepartmentCourseProvider>
  </BrowserRouter>
);
