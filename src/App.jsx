import { Outlet, useLocation, useMatch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import Navbar from "./layout/Navbar";
import Report from "./pages/Report";
import Modal from "./components/Modal/Modal";
import Settings from "./pages/Settings";

function App() {
  const location = useLocation();
  const reportMatch = useMatch("/report");
  const settingsMatch = useMatch("/settings");

  const state = location.state;
  const backgroundLocation = state?.backgroundLocation || { pathname: "/" };

  const isModal = location.state?.backgroundLocation;

  return (
    <>
      <div>
        <Navbar />
        <main>
          <ToastContainer />
          <Outlet location={backgroundLocation || location} />

          {isModal && reportMatch && (
            <Modal onClose={() => window.history.back()}>
              <Report />
            </Modal>
          )}

          {isModal && settingsMatch && (
            <Modal onClose={() => window.history.back()}>
              <Settings />
            </Modal>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
