import { createHashRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export const router = createHashRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <App />,
        children: [
          { index: true, element: <HomePage /> },
          { path: "report", element: <div>Report Page</div> },
          { path: "settings", element: <div>Settings Page</div> },
        ],
      },
    ],
  },
]);
