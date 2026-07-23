import { useState, useEffect } from "react";
import { getTasks } from "../api/tasks";
import { getDeadlines } from "../api/deadlines";
import "./CalendarPage.css";
import { useNavigate } from "react-router-dom";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function CalendarPage() {
  const navigate = useNavigate();

  const today = new Date();
  const [current, setCurrent] = useState({
    month: today.getMonth(),
    year: today.getFullYear(),
  });
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    Promise.all([getTasks(), getDeadlines()]).then(([tasks, deadlines]) => {
      const taskEvents = tasks
        .filter((t) => t.due_date)
        .map((t) => ({ id: `task-${t.id}`, title: t.title, date: t.due_date.slice(0, 10), type: "task" }));
      const deadlineEvents = deadlines.map((d) => ({
        id: `deadline-${d.id}`,
        title: d.title,
        date: d.date.slice(0, 10),
        type: "deadline",
      }));
      setEvents([...taskEvents, ...deadlineEvents]);
    });
  }, []);

  function prevMonth() {
    setCurrent((c) => {
      const month = c.month === 0 ? 11 : c.month - 1;
      const year = c.month === 0 ? c.year - 1 : c.year;
      return { month, year };
    });
  }

  function nextMonth() {
    setCurrent((c) => {
      const month = c.month === 11 ? 0 : c.month + 1;
      const year = c.month === 11 ? c.year + 1 : c.year;
      return { month, year };
    });
  }

  const firstDay = new Date(current.year, current.month, 1).getDay();
  const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();
  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  function isoDate(day) {
    const mm = String(current.month + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${current.year}-${mm}-${dd}`;
  }

  function eventsForDay(day) {
    return events.filter((e) => e.date === isoDate(day));
  }

  function isToday(day) {
    return (
      day === today.getDate() &&
      current.month === today.getMonth() &&
      current.year === today.getFullYear()
    );
  }

  const selectedEvents = selectedDate ? eventsForDay(selectedDate) : [];

  return (
    <div className="calendar-page">
      <div className="calendar-card">
        <div className="cal-header">
          <button className="cal-nav-btn" onClick={prevMonth}>&#8249;</button>
          <h2 className="cal-title">
            {MONTHS[current.month]} {current.year}
          </h2>
          <button className="cal-nav-btn" onClick={nextMonth}>&#8250;</button>
        </div>

        <div className="cal-grid">
          {DAYS.map((d) => (
            <div key={d} className="cal-day-label">{d}</div>
          ))}
          {cells.map((day, i) => {
            if (!day) return <div key={`empty-${i}`} />;
            const dayEvents = eventsForDay(day);
            const selected = selectedDate === day;
            return (
              <div
                key={day}
                className={`cal-cell ${isToday(day) ? "cal-today" : ""} ${selected ? "cal-selected" : ""}`}
                onClick={() => setSelectedDate(selected ? null : day)}
              >
                <span className="cal-day-num">{day}</span>
                {dayEvents.length > 0 && (
                  <div className="cal-dots">
                    {dayEvents.map((e) => (
                      <span key={e.id} className={`cal-dot cal-dot-${e.type}`} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="cal-legend">
          <span className="cal-legend-item">
            <span className="cal-dot cal-dot-deadline" /> Deadline
          </span>
          <span className="cal-legend-item">
            <span className="cal-dot cal-dot-task" /> Task
          </span>
        </div>
      </div>

      <div className={`cal-detail ${selectedDate ? "cal-detail-visible" : ""}`}>
        {selectedDate ? (
          <>
            <h3 className="cal-detail-title">
              {MONTHS[current.month]} {selectedDate}
            </h3>
            {selectedEvents.length === 0 ? (
              <p className="cal-detail-empty">No events on this day.</p>
            ) : (
              <ul className="cal-event-list">
                {selectedEvents.map((e) => (
                  <li key={e.id} className="cal-event-item">
                    <span className={`cal-event-badge cal-event-badge-${e.type}`}>
                      {e.type === "deadline" ? "Deadline" : "Task"}
                    </span>
                    <span className="cal-event-title">{e.title}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <p className="cal-detail-empty">Click a day to see events.</p>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
