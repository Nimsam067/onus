const tasks = [ // array of task objects, can be fetched from backend in future
  {
    id: 1,
    title: "circuit design",
    description: "design circuits on tinkercad for colour sensor and IR sensor",
    completed: false,
    dueDate: "May 24th"
  },
  {
    id: 2,
    title: "set up rpi and configure VPN",
    description: "flash sd card and set up rpi for remote access",
    completed: true,
    dueDate: "May 21"
  },
  {
    id: 3,
    title: "design report",
    description: "create report template and fill in details",
    completed: false,
    dueDate: "May 20"
  },
  {
    id: 4,
    title: "navigation algorithm",
    description: "Implement navigation algorithm for robot",
    completed: false,
    dueDate: "May 30"
  },
];

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <input type="checkbox" checked={task.completed} readOnly />

      <div className="task-info">
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <span>{task.dueDate}</span>
      </div>

      <button className="menu-button">...</button>
    </div>
  );
}

export default TaskCard;