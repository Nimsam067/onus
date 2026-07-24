import { useEffect, useState } from "react";
import { getTeamMembers } from "../api/teams";
import "./ProfileModal.css";

function ProfileModal({ user, team, onClose, onLogout }) {
    const [expanded, setExpanded] = useState(false);
    const [members, setMembers] = useState([]);

    useEffect(() => {
        async function loadMembers() {
            if (!expanded) return;

            try {
                const data = await getTeamMembers();
                setMembers(data);
            } catch (err) {
                console.error(err);
            }
        }

        loadMembers();
    }, [expanded]);

    return (
        <div className="profile-modal">
            <div className="profile-header">
                <div className="profile-avatar">
                    {user?.displayName?.charAt(0).toUpperCase()}
                </div>

                <div>
                    <h3>{user?.displayName}</h3>
                    <p>{user?.email}</p>
                </div>
            </div>

            <hr />

            <div className="profile-section">
                <h4 className="profile-heading">
                    Current Team
                </h4>
                <button
                    className="profile-team-btn"
                    onClick={() => setExpanded(!expanded)}
                >

                    <span>
                        {expanded ? "▼" : "▶"} {team?.name || "No Team"}
                    </span>

                </button>

                {expanded && (
                    <div className="team-details">

                        <h4>Members</h4>

                        {members.map(member => (
                            <div
                                key={member.id}
                                className="team-member"
                            >
                                {member.display_name}
                            </div>
                        ))}

                        <hr />

                        <h4>Invite Code</h4>

                        <div className="invite-code">

                            <span>{team.code}</span>

                            <button
                                onClick={() =>
                                    navigator.clipboard.writeText(team.code)
                                }
                            >
                                Copy
                            </button>

                        </div>

                    </div>
                )}

            </div>


        </div>
    );
}

export default ProfileModal;