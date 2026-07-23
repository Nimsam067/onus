import { auth } from "../firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

async function authHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

export async function getResources() {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/resources`, { headers, cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch resources");
  return res.json();
}

export async function addLink(title, url) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/resources/link`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ title, url }),
  });
  if (!res.ok) throw new Error("Failed to add link");
  return res.json();
}

export async function uploadFile(title, file) {
  const headers = await authHeaders();
  const base64 = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const res = await fetch(`${API_URL}/api/resources/upload`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ title: title || file.name, filename: file.name, data: base64 }),
  });
  if (!res.ok) throw new Error("Failed to upload file");
  return res.json();
}

export async function deleteResource(id) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/resources/${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete resource");
}
