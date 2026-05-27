const express = require("express");
const cors = require("cors");
const tasksRouter = require("./routes/tasks");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});