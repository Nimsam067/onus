const pool = require('./db');

// Tasks taken from src/components/tasks_dashboard.jsx
const tasks = [
  {
    title: "Circuit Design",
    description: "Design circuits on Tinkercad for colour and IR sensors (Assigned to: Aadi)",
    completed: false,
    dueDate: "May 18"
  },
  {
    title: "Setup VPN",
    description: "Flash SD card and configure Raspberry Pi (Assigned to: Jitisha)",
    completed: true,
    dueDate: "May 20"
  },
  {
    title: "Design Report",
    description: "Create report template and populate sections (Assigned to: Aadi)",
    completed: false,
    dueDate: "May 22"
  },
  {
    title: "Navigation Algorithm",
    description: "Implement navigation logic for robot (Assigned to: Jitisha)",
    completed: false,
    dueDate: "May 25"
  }
];

(async function seed() {
  try {
    console.log('Seeding tasks table with dashboard tasks...');
    await pool.query('TRUNCATE tasks RESTART IDENTITY CASCADE');

    const insertText = 'INSERT INTO tasks (title, description, completed, due_date) VALUES ($1, $2, $3, $4) RETURNING id';

    for (const t of tasks) {
      const res = await pool.query(insertText, [t.title, t.description, t.completed, t.dueDate]);
      console.log('Inserted task id', res.rows[0].id);
    }

    console.log('Seeding complete.');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await pool.end();
  }
})();
