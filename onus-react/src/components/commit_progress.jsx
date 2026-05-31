import { useEffect, useRef } from "react";

function CommitProgress() {
    // Backend integration will be added later
    const commits = [
    {
        id: 1,
        task: "Circuit Design",
        person: "Aadi",
        date: "May 18"
    },
    {
        id: 2,
        task: "VPN Setup",
        person: "Jitisha",
        date: "May 20"
    },
    {
      id: 3,
        task: "Design Report",
        person: "Aadi",
        date: "May 22"
    },
    {
        id: 4,
        task: "Navigation Algorithm",
        person: "Jitisha",
        date: "May 25"
    }
    ];

    const timelineRef = useRef(null);

    useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollLeft =
        timelineRef.current.scrollWidth;
    }
    }, []);

    return (
    <div className="commit-progress">

      <h2 className="card-title">
        Commit Progress
      </h2>

      <div
        className="timeline-container"
        ref={timelineRef}
      >

        {commits.map((commit, index) => (
          <div
            key={commit.id}
            className="timeline-item"
          >
            <div
              className={
                index === commits.length - 1
                  ? "timeline-circle latest-circle"
                  : "timeline-circle"
              }
            />

            <div className="timeline-info">
              <p>{commit.task}</p>
              <span>{commit.person}</span>
              <span>{commit.date}</span>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default CommitProgress;