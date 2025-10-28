import { useLoaderData } from "react-router-dom";
import PomodoroReportChart from "../components/Chart/PomodoroReportChart";

function Report() {
  const userData = useLoaderData();

  return (
    <>
      <h2 className="text-lg font-semibold text-gray-900 inline-block px-2 py-1 rounded mb-1">
        Weekly Pomodoro Progress
      </h2>
      <p className="text-sm text-gray-900 inline-block px-2 py-1 rounded mb-4">
        This chart shows the total number of Pomodoro sessions you’ve completed
        each day. Use it to track your focus consistency and identify which days
        you’re most productive.
      </p>

      <PomodoroReportChart />
    </>
  );
}

export default Report;
