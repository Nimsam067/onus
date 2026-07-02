import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function ContributionChart() {
    // Backend integration will be added later
    const contributionData = [
    {
        name: "Aadi",
        color: "#635bff",
        contributions: [3, 5, 4, 8, 6, 7, 9]
    },
    {
        name: "Jitisha",
        color: "#10b981",
        contributions: [2, 3, 5, 4, 6, 4, 5]
    },
    {
        name: "Ryan",
        color: "#f59e0b",
        contributions: [1, 2, 2, 3, 4, 3, 4]
    }
    ];

    const data = [
    {
    day: "Mon",
    Aadi: 3,
    Jitisha: 2,
    Ryan: 1
    },
    {
    day: "Tue",
    Aadi: 5,
    Jitisha: 3,
    Ryan: 2
    },
    {
    day: "Wed",
    Aadi: 4,
    Jitisha: 5,
    Ryan: 2
    },
    {
    day: "Thu",
    Aadi: 8,
    Jitisha: 4,
    Ryan: 3
    },
    {
    day: "Fri",
    Aadi: 6,
    Jitisha: 6,
    Ryan: 4
    },
    {
    day: "Sat",
    Aadi: 7,
    Jitisha: 4,
    Ryan: 3
    },
    {
    day: "Sun",
    Aadi: 9,
    Jitisha: 5,
    Ryan: 4
    }
    ];

    return (
    <div className="content-dashboard">

    <h2 className="card-title">
      Contribution Dashboard
    </h2>

    <div className="contribution-legend">
      <span className="legend-item">🟣 Aadi</span>
      <span className="legend-item">🟢 Jitisha</span>
      <span className="legend-item">🟠 Ryan</span>
    </div>

    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>

          <XAxis dataKey="day" />

          <YAxis width={25}/>

          <Tooltip />

          <Line
            type="monotone"
            dataKey="Aadi"
            stroke="#635bff"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="Jitisha"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="Ryan"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={{ r: 4 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </div>

    </div>
    );
}

export default ContributionChart;