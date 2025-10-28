import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import React from "react";

import "./index.css";
import { router } from "./routes";
import { AuthProvider } from "./context/authContext";
import { TaskProvider } from "./context/taskContext";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  </AuthProvider>
);
