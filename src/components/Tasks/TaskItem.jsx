import { Check, Trash2 } from "lucide-react";
import { useActiveTask } from "../../context/taskContext";

const TaskItem = ({ task, handleMarkComplete, handleDelete }) => {
  const { handleActiveTask } = useActiveTask();
  return (
    <div
      key={task.id}
      className={`flex items-center justify-between bg-white text-gray-900 rounded-xl shadow p-3 border transition ${
        task.isCompleted ? "opacity-70 line-through" : ""
      }`}
      onClick={() => handleActiveTask(task)}
    >
      <div>
        <h3 className="font-semibold">{task.title}</h3>
        <p className="text-sm text-gray-500">
          {task.completedPomos}/{task.totalPomos} pomodoros
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => handleMarkComplete(task.id, task.isCompleted)}
          className={`p-2 rounded-lg transition ${
            task.isCompleted
              ? "bg-green-100 text-green-600 hover:bg-green-200"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          title="Mark Complete"
        >
          <Check size={18} />
        </button>
        <button
          onClick={() => handleDelete(task.id)}
          className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
          title="Delete Task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
