function DeadlineTracker() {
  // Backend integration will be added later
  const deadlines = [
    {
      id: 1,
      title: "Project Proposal",
      date: "May 15, 2025",
    },
    {
      id: 2,
      title: "Live circuit demo",
      date: "May 24, 2025",
    },
    {
      id: 3,
      title: "Final report submission",
      date: "Jun 7, 2025",
    },
  ];

  return (
    <div className="deadline-card">
        <h2 className="card-title">Deadline Tracker</h2>
      <div className="deadline-list">
        {deadlines.map((deadline) => (
          <div className="deadline-row" key={deadline.id}>
            <div className="deadline-left">
              <span className="small-calendar-icon">📅</span>
              <p>{deadline.title}</p>
            </div>

            <p className="deadline-date">{deadline.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeadlineTracker;