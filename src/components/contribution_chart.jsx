import { useState } from "react";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ContributionChart({ tasks, highlightName }) {
  const [mode, setMode] = useState("completed");

  const filteredTasks =
    mode === "completed"
      ? tasks.filter(task => task.status === "done")
      : tasks;

  const COLORS = [
    "#635bff",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#3b82f6",
    "#8b5cf6",
    "#14b8a6",
  ];

  let pieData;
  if (highlightName) {
    let myEffort = 0, othersEffort = 0;
    filteredTasks.forEach(task => {
      const effort = task.effort || 3;
      if (task.assignee === highlightName) {
        myEffort += effort;
      } else {
        othersEffort += effort;
      }
    });
    pieData = [
      { name: "You", value: myEffort },
      ...(othersEffort > 0 ? [{ name: "Others", value: othersEffort }] : []),
    ];
  } else {
    const contributionMap = {};
    filteredTasks.forEach(task => {
      const person = (task.assignee || "Unassigned").trim().toLowerCase();
      contributionMap[person] = (contributionMap[person] || 0) + (task.effort || 3);
    });
    pieData = Object.entries(contributionMap).map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
  }

  const totalEffort = pieData.reduce((sum, p) => sum + p.value, 0);

  const sliceColors = highlightName
    ? ["#635bff", "#e2e8f0"]
    : COLORS;


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

              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                label={false}
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={sliceColors[index % sliceColors.length]}
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
              <text
                x="50%"
                y="38%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={13}
                fontWeight="600"
                fill="#6b7280"
              >
                {highlightName
                  ? (mode === "completed" ? "Completed" : "Assigned")
                  : (mode === "completed" ? "Completed" : "Assigned")}
              </text>

              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={30}
                fontWeight="700"
                fill="#1f2937"
              >
                {highlightName ? (pieData[0]?.value ?? 0) : totalEffort}
              </text>

              <text
                x="50%"
                y="61%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={12}
                fill="#94a3b8"
              >
                {highlightName ? "Your Points" : (totalEffort === 1 ? "Effort Point" : "Effort Points")}
              </text>

            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="contribution-sidebar">
          <h3 className="sidebar-title">
            {highlightName ? "My Contribution" : "Team Contribution"}
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
                        sliceColors[index % sliceColors.length]
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