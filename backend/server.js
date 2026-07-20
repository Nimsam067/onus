const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");
const deadlinesRouter = require("./routes/deadlines");
const teamsRouter = require("./routes/teams");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/api/tasks", tasksRouter);
app.use("/api/deadlines", deadlinesRouter);
app.use("/api/teams", teamsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
