import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useTasks from "../../hooks/useTasks";

function PomodoroReportChart() {
  const { useWeeklyPomodoroData } = useTasks();
  const data = useWeeklyPomodoroData();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="pomodoro"
          stroke="#82ca9d"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
export default PomodoroReportChart;
