import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export function TaskProvider({ children }) {
  const [activeTask, setActiveTask] = useState({});

  function handleActiveTask(task) {
    setActiveTask({
      taskId: task.id,
      ...task,
    });
  }

  return (
    <TaskContext.Provider
      value={{ activeTask, setActiveTask, handleActiveTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useActiveTask() {
  return useContext(TaskContext);
}
