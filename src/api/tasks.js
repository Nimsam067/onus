import { auth } from "../firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

async function authHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

export async function getTasks() {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/tasks`, { headers, cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask({ title, description, dueDate, status, assignee, effort }) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/tasks`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate, status, assignee, effort }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(id, updates) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/tasks/${id}`, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(id) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/tasks/${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete task");
}
