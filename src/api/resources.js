import { auth } from "../firebase";

const CLOUDINARY_CLOUD_NAME = "sfgj0ljy";
const CLOUDINARY_UPLOAD_PRESET = "onusss";

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

  // Upload directly to Cloudinary (bypasses CloudFront entirely)
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  const cloudRes = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/raw/upload`,
    { method: "POST", body: formData }
  );
  if (!cloudRes.ok) throw new Error("Failed to upload to Cloudinary");
  const { secure_url } = await cloudRes.json();

  // Save the Cloudinary URL to our backend
  const res = await fetch(`${API_URL}/api/resources/upload`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ title: title || file.name, url: secure_url }),
  });
  if (!res.ok) throw new Error("Failed to save file resource");
  return res.json();
}

export async function deleteResource(id) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/resources/${id}`, { method: "DELETE", headers });
  if (!res.ok) throw new Error("Failed to delete resource");
}
