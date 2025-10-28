const LoginForm = ({ handleGoogleLogin }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl flex flex-col items-center w-[90%] sm:w-[400px]">
      <h2 className="text-2xl font-semibold mb-6">Sign in to continue 👋</h2>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-3 bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:bg-gray-50 transition w-full justify-center"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default LoginForm;
