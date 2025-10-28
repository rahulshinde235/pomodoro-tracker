import { useAuth } from "../context/authContext";

const useUserInfo = () => {
  const { authUser, userDoc } = useAuth();

  const {
    longBreakDuration = 25,
    longBreakInterval = 4,
    pomodoroDuration = 25,
    shortBreakDuration = 5,
    name = "",
    email = "",
    createdAt = null,
  } = userDoc || {};

  const modeMap = {
    work: pomodoroDuration,
    shortBreak: shortBreakDuration,
    longBreak: longBreakDuration,
    longBreakInterval,
  };

  return {
    modeMap,
    name,
    email,
    createdAt,
    userId: authUser?.uid || null,
  };
};

export default useUserInfo;
