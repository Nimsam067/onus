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
  const [mode, setMode] = useState("completed");

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

  const filteredTasks =
    mode === "completed"
      ? tasks.filter(task => task.status === "done")
      : tasks;

  const contributionMap = {};

  filteredTasks.forEach(task => {
    const person = (task.assignee || "Unassigned")
      .trim()
      .toLowerCase();

    contributionMap[person] =
      (contributionMap[person] || 0) +
      (task.effort || 3);
  });

  const pieData = Object.entries(contributionMap).map(
    ([name, value]) => ({
      name:
        name.charAt(0).toUpperCase() +
        name.slice(1),
      value,
    })
  );

  const totalEffort = pieData.reduce(
    (sum, person) => sum + person.value,
    0
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


  return (
    <div className="content-dashboard">
      <div className="contribution-header">
        <h2 className="card-title">
          Contribution Dashboard
        </h2>

        <div className="contribution-toggle">

          <button
            className={mode === "completed" ? "active" : ""}
            onClick={() => setMode("completed")}
          >
            Completed
          </button>

          <button
            className={mode === "assigned" ? "active" : ""}
            onClick={() => setMode("assigned")}
          >
            Assigned
          </button>

        </div>
      </div>


      <div className="contribution-content">

        <div className="chart-container">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <text
                x="50%"
                y="47%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={28}
                fontWeight="700"
                fill="#1f2937"
              >
                {totalEffort}
              </text>

              <text
                x="50%"
                y="58%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fill="#6b7280"
              >
                {mode === "completed"
                  ? "Completed"
                  : "Assigned"}
              </text>

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={95}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value, name, props) => {
                  const total = pieData.reduce(
                    (sum, item) => sum + item.value,
                    0
                  );

                  return [
                    `${((value / total) * 100).toFixed(1)}%`,
                    props.payload.name,
                  ];
                }}
              />

              <Legend />

            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="contribution-sidebar">
          <h3 className="sidebar-title">
            Team Contribution
          </h3>
          {pieData.map((person, index) => {

            const total = pieData.reduce(
              (sum, item) => sum + item.value,
              0
            );

            return (

              <div
                className="contribution-person"
                key={person.name}
              >

                <div className="person-left">

                  <span
                    className="color-dot"
                    style={{
                      background:
                        COLORS[index % COLORS.length]
                    }}
                  />

                  {person.name}

                </div>

                <strong>

                  {(
                    person.value
                    / total
                    * 100
                  ).toFixed(1)}%

                </strong>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default ContributionChart;