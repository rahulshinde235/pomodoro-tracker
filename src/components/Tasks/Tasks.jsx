import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import useTasks from "../../hooks/useTasks";
import { Loader2 } from "lucide-react";
import TaskItem from "./TaskItem";

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, loadingTasks } = useTasks();
  const [isActive, setIsActive] = useState(false);

  const handleAddTask = async (task) => {
    await addTask(task);
    setIsActive(false);
  };

  const handleMarkComplete = async (taskId, isCompleted) => {
    await updateTask(taskId, { isCompleted: !isCompleted });
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">Your Tasks</h2>

      <TaskForm
        isActive={isActive}
        setIsActive={setIsActive}
        onAddTask={handleAddTask}
      />

      {loadingTasks ? (
        <div className="flex justify-center mt-6">
          <Loader2 className="animate-spin text-amber-400" size={28} />
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No tasks yet — add one!
        </p>
      ) : (
        <div className="space-y-3 mt-6">
          {tasks.map((task) => (
            <TaskItem
              task={task}
              handleMarkComplete={handleMarkComplete}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
