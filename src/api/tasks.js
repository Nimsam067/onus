const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

const MOCK_TASKS = [
  { id: 1, title: "Finish backend", description: "Get the API working", completed: false, due_date: "2025-06-15" },
  { id: 2, title: "Deploy frontend", description: "Host the React app", completed: false, due_date: "2025-06-20" },
  { id: 3, title: "Write tests", description: "Add unit tests for routes", completed: true, due_date: "2025-06-10" },
  { id: 4, title: "Design review", description: "Get feedback on UI", completed: true, due_date: "2025-06-05" },
];

// Flip this to false once the real backend is running
const USE_MOCK = false;

export async function getTasks() {
  if (USE_MOCK) return MOCK_TASKS;
  const res = await fetch(`${API_URL}/api/tasks`);
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask({ title, description, dueDate }) {
  if (USE_MOCK) {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      due_date: dueDate || null,
    };
    MOCK_TASKS.push(newTask);
    return newTask;
  }
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id, updates) {
  if (USE_MOCK) {
    const task = MOCK_TASKS.find((t) => t.id === id);
    if (task) Object.assign(task, updates);
    return task;
  }
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id) {
  if (USE_MOCK) {
    const index = MOCK_TASKS.findIndex((t) => t.id === id);
    if (index !== -1) MOCK_TASKS.splice(index, 1);
    return;
  }
  const res = await fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task");
}
