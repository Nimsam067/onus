import { useEffect, useState } from "react";
import { getTasks } from "../api/tasks";

import {
PieChart,
Pie,
Cell,
Legend,
Tooltip,
ResponsiveContainer
} from "recharts";

function ContributionChart() {
  const [tasks, setTasks] = useState([]);

useEffect(() => {
  async function loadTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  }

  loadTasks();
}, []);

// Computing contributions (weighted averages essentially)
const contributionMap = {};

tasks
  .filter(task => task.status === "done")
  .forEach(task => {

    const person =
      (task.assignee || "Unassigned")
        .trim()
        .toLowerCase();

    contributionMap[person] =
      (contributionMap[person] || 0)
      + (task.effort || 3);

});

const pieData = Object.entries(contributionMap).map(
  ([name, value]) => ({
    name:
      name.charAt(0).toUpperCase() +
      name.slice(1),
    value,
  })
);

// Good pichart colors
const COLORS = [
  "#635bff",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#3b82f6",
  "#8b5cf6",
  "#14b8a6",
];

console.log(tasks);
console.log(pieData);

    return (
    <div className="content-dashboard">

    <h2 className="card-title">
      Contribution Dashboard
    </h2>

   

    <div className="chart-container">
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>

  <Pie
    data={pieData}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    outerRadius={90}
    label
  >
    {pieData.map((entry, index) => (
      <Cell
        key={entry.name}
        fill={COLORS[index % COLORS.length]}
      />
    ))}
  </Pie>

  <Tooltip />

  <Legend />

</PieChart>
      </ResponsiveContainer>
    </div>

    </div>
    );
}

export default ContributionChart;