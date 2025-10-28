import useTasks from "../../hooks/useTasks";

const TaskSummary = () => {
  const { totalPomos, completedPomos } = useTasks();
  return (
    <div className="taskSummary-container flex flex-col items-center p-2 m-2 pb-4 bg-white/10 rounded">
      <div className="flex">
        <span className="text-amber-50/80">Pomos : </span>
        {`${completedPomos} / ${totalPomos}`}
      </div>
      <div className="flex">
        <span className="text-amber-50/80">Finish A :</span>
        <span>Pending logic</span>
      </div>
    </div>
  );
};

export default TaskSummary;
