import { useRef } from "react";
import { Plus } from "lucide-react";

const TaskForm = ({ isActive, setIsActive, onAddTask }) => {
  const titleRef = useRef("");
  const pomoRef = useRef(1);

  function handleSave() {
    const title = titleRef.current.value.trim();
    const totalPomos = parseInt(pomoRef.current.value) || 0;

    if (!title) return;
    onAddTask({ title, totalPomos });
    titleRef.current.value = "";
    pomoRef.current.value = 1;
  }

  return (
    <>
      {isActive ? (
        <div className="bg-white text-gray-900 rounded-xl shadow-lg mt-4 p-4 border border-gray-200">
          <input
            type="text"
            ref={titleRef}
            placeholder="What are you working on?"
            className="w-full mb-3 p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <label className="block text-sm font-semibold text-gray-700 mb-1 ml-1">
            Estimated Pomodoros
          </label>
          <input
            type="number"
            ref={pomoRef}
            min="1"
            className="w-full mb-4 p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsActive(false)}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-amber-400 text-white font-medium hover:bg-amber-500 transition"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center border-2 border-dashed border-gray-400 rounded-xl p-4 mt-4 hover:bg-gray-50 transition">
          <button
            onClick={() => setIsActive(true)}
            className="flex items-center gap-2 text-amber-500 font-medium"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
        </div>
      )}
    </>
  );
};

export default TaskForm;
