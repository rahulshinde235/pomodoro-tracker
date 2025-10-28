import { useEffect, useState } from "react";
import Button from "../Button/Button";
import "./Infocard.css";
import { formatTime } from "../../utils/formatTime";
import useUserInfo from "../../hooks/useUserInfo";
import useSessionLogger from "../../hooks/useSessionLogger";
import Tasks from "../Tasks/Tasks";
import { useActiveTask } from "../../context/taskContext";

function Infocard() {
  const { modeMap } = useUserInfo();
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [phase, setPhase] = useState("work");
  const [timeLeft, setTimeLeft] = useState(modeMap[phase]);
  const { startSession, endSession, activeSessionId } = useSessionLogger();
  const { activeTask } = useActiveTask();

  const handleTimerState = () => {
    if (!isTimerActive) {
      startSession(phase);
    }
    setIsTimerActive((isTimerActive) => !isTimerActive);
  };

  function resetState() {
    setIsTimerActive(false);
    setTimeLeft(modeMap[phase]);
  }
  useEffect(() => {
    setTimeLeft(modeMap[phase]);
  }, [phase]);

  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetState();
          endSession(activeSessionId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, phase, activeSessionId]);

  useEffect(() => {
    const root = document.documentElement;

    const colors = {
      work: "rgb(186, 73, 73)", // red
      shortBreak: "rgb(76, 145, 149)", // teal
      longBreak: "rgb(69, 124, 163)", // blue
    };

    root.style.setProperty("--color-bg-base", colors[phase]);
  }, [phase]);

  return (
    <div className="mb-2">
      <div className="info-card flex flex-col p-2 m-2 pb-4 bg-white/10 rounded-lg lg:max-w-[50%] mx-auto">
        {
          <div className="grid grid-cols-3 gap-4  text-xs sm:text-sm">
            <Button text="Promodoro" onClick={() => setPhase("work")} />
            <Button text="Short Break" onClick={() => setPhase("shortBreak")} />
            <Button text="Long Break" onClick={() => setPhase("longBreak")} />
          </div>
        }
        <div className="timer text-center">{formatTime(timeLeft)}</div>
        <div className="action-btn">
          <Button
            text={isTimerActive ? "Pause" : "Start"}
            className={isTimerActive ? "pause" : "start"}
            onClick={handleTimerState}
          />
        </div>
      </div>
      <div className="flex flex-col items-center">
        {activeTask ? (
          <span className="text-amber-50/80"># {activeTask.title}</span>
        ) : (
          <span className="text-amber-50/80">Time to focus!</span>
        )}
      </div>
      <Tasks />
    </div>
  );
}

export default Infocard;
