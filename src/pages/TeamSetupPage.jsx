import { useState } from "react";
import { createTeam, joinTeam } from "../api/teams";
import "./TeamSetupPage.css";

function TeamSetupPage({ onTeamJoined }) {
  const [view, setView] = useState("choose"); // "choose" | "create" | "join"
  const [teamName, setTeamName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [createdTeam, setCreatedTeam] = useState(null);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { team } = await createTeam(teamName);
      setCreatedTeam(team);
    } catch {
      setError("Failed to create team. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleJoin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await joinTeam(code);
      onTeamJoined();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (createdTeam) {
    return (
      <div className="team-setup-page">
        <div className="team-setup-card">
          <div className="team-setup-icon">🎉</div>
          <h2>Team created!</h2>
          <p className="team-setup-sub">Share this code with your teammates so they can join:</p>
          <div className="team-code-display">{createdTeam.code}</div>
          <p className="team-setup-hint">They'll enter this on their first login.</p>
          <button className="team-btn-primary" onClick={onTeamJoined}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (view === "create") {
    return (
      <div className="team-setup-page">
        <div className="team-setup-card">
          <button className="team-back-btn" onClick={() => setView("choose")}>← Back</button>
          <h2>Create a team</h2>
          <p className="team-setup-sub">Give your team a name to get started.</p>
          <form onSubmit={handleCreate}>
            <input
              className="team-input"
              type="text"
              placeholder="e.g. CS1010 Group 4"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              autoFocus
            />
            {error && <p className="team-error">{error}</p>}
            <button className="team-btn-primary" type="submit" disabled={!teamName.trim() || loading}>
              {loading ? "Creating..." : "Create Team"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (view === "join") {
    return (
      <div className="team-setup-page">
        <div className="team-setup-card">
          <button className="team-back-btn" onClick={() => setView("choose")}>← Back</button>
          <h2>Join a team</h2>
          <p className="team-setup-sub">Enter the code your team leader shared with you.</p>
          <form onSubmit={handleJoin}>
            <input
              className="team-input team-code-input"
              type="text"
              placeholder="e.g. AB12CD"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              maxLength={8}
              autoFocus
            />
            {error && <p className="team-error">{error}</p>}
            <button className="team-btn-primary" type="submit" disabled={!code.trim() || loading}>
              {loading ? "Joining..." : "Join Team"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="team-setup-page">
      <div className="team-setup-card">
        <div className="team-setup-icon">👋</div>
        <h2>Welcome to onus</h2>
        <p className="team-setup-sub">Set up your workspace to get started.</p>
        <div className="team-choice-btns">
          <button className="team-btn-primary" onClick={() => setView("create")}>
            Create a new team
          </button>
          <button className="team-btn-secondary" onClick={() => setView("join")}>
            Join with a code
          </button>
        </div>
      </div>
    </div>
  );
}

export default TeamSetupPage;
