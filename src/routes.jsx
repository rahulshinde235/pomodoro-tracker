import { createBrowserRouter } from "react-router-dom"; // ✅ Fix import
import HomePage from "./pages/HomePage";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, // 👈 Public route
  },
  {
    path: "/",
    element: <ProtectedRoute />, // 👈 Everything below requires login
    children: [
      {
        element: <App />, // 👈 App layout (contains <Outlet />)
        children: [
          { index: true, element: <HomePage /> },
          { path: "report", element: <div>Report Page</div> },
          { path: "settings", element: <div>Settings Page</div> },
        ],
      },
    ],
  },
]);
