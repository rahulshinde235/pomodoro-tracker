import google from "/google.png";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm.jsx";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const user = await login();
      if (user) navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-500 to-red-700 text-white px-4">
      <div className="max-w-2xl text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Welcome to <span className="text-yellow-300">YourApp</span>
        </h1>
        <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
          Your one-stop platform to manage tasks, track progress, and stay
          productive — all in one beautiful dashboard.
        </p>
      </div>
      <LoginForm handleGoogleLogin={handleGoogleLogin} />
    </div>
  );
}

export default LoginPage;
