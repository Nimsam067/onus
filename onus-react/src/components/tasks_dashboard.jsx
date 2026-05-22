
import TaskCard from "./tasks_cards";


function TasksDashboard() {
    const tasks = [ 
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
    
    return (
    <div className="tasks-dashboard">
      <h1>Tasks Dashboard</h1>
      {tasks.map((task) => (
  <TaskCard key={task.id} task={task} />
))}
    </div>
  );
}

export default TasksDashboard;