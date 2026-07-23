import TaskCard from "./tasks_cards";
import "../App.css";
import {
  getTasks,
  deleteTask,
  updateTask,
} from "../api/tasks";

function TasksDashboard({
  tasks,
  setTasks,
  onAddTask,
  onEditTask,
}) {

  async function handleDelete(id) {
    try {
      await deleteTask(id);

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleToggleComplete(task) {
    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        dueDate: task.due_date,
        completed: !task.completed,
      });

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleStatusChange(task, newStatus) {
    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        dueDate: task.due_date,
        status: newStatus,
        assignee: task.assignee,
        completed: newStatus === "done",
      });

      const updatedTasks = await getTasks();
      setTasks(updatedTasks);
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit(task) {
    onEditTask(task);
  }

  const STATUS_ORDER = {
    in_progress: 0,
    not_started: 1,
    done: 2,
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    const orderDiff =
      STATUS_ORDER[a.status] - STATUS_ORDER[b.status];

    if (orderDiff !== 0) {
      return orderDiff;
    }

    // Optional: sort by due date within each status
    if (a.due_date && b.due_date) {
      return new Date(a.due_date) - new Date(b.due_date);
    }

    return 0;
  });

  return (
    <div className="tasks-dashboard">
      <div className="tasks-header">
        <h2 className="card-title">Tasks Dashboard</h2>
        <button className="add-task-btn" onClick={onAddTask}>
          + New Task
        </button>
      </div>

      <div className="tasks-grid">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          sortedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TasksDashboard;
