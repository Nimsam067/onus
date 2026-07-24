import { auth } from "../firebase";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

async function authHeaders() {
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

export async function getMyTeam() {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/teams/me`, { headers, cache: "no-store" });
  if (!res.ok) throw new Error("Failed to get team");
  return res.json();
}

export async function getTeamMembers() {
  const headers = await authHeaders();

  const res = await fetch(
    `${API_URL}/api/teams/members`,
    { headers }
  );

  if (!res.ok) {
    throw new Error("Failed to load members");
  }

  return res.json();
}

export async function createTeam(name) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/teams/create`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create team");
  return res.json();
}

export async function joinTeam(code) {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/teams/join`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to join team");
  return data;
}

export async function leaveTeam() {
  const headers = await authHeaders();

  const res = await fetch(`${API_URL}/api/teams/leave`, {
    method: "POST",
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to leave team");
  }

  return data;
}