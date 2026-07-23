const express = require("express");
const cors = require("cors");
const path = require("path");
const tasksRouter = require("./routes/tasks");
const deadlinesRouter = require("./routes/deadlines");
const teamsRouter = require("./routes/teams");
const resourcesRouter = require("./routes/resources");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => res.send("Backend is running"));

app.use("/api/tasks", tasksRouter);
app.use("/api/deadlines", deadlinesRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/resources", resourcesRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.header("Access-Control-Allow-Origin", "*");
  res.status(500).json({ error: err.message || "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
