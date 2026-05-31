import TaskCard from "./tasks_cards";
import "../App.css";

function TasksDashboard() {
  // Backend integration will be added later
  const tasks = [
  {
    id: 1,
    title: "Circuit Design",
    description: "Design circuits on Tinkercad for colour and IR sensors",
    completed: false,
    createdDate: "May 18",
    assignedTo: "Aadi"
  },
  {
    id: 2,
    title: "Setup VPN",
    description: "Flash SD card and configure Raspberry Pi",
    completed: true,
    createdDate: "May 20",
    assignedTo: "Jitisha"
  },
  {
    id: 3,
    title: "Design Report",
    description: "Create report template and populate sections",
    completed: false,
    createdDate: "May 22",
    assignedTo: "Aadi"
  },
  {
    id: 4,
    title: "Navigation Algorithm",
    description: "Implement navigation logic for robot",
    completed: false,
    createdDate: "May 25",
    assignedTo: "Jitisha"
  }
  ];
    
  return (
    <div className="tasks-dashboard">
      <h2 className="card-title">Tasks Dashboard</h2>

      <div className="tasks-grid">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
          />
        ))}
      </div>
    </div>
  );
}

export default TasksDashboard;