require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // ✅ Import MongoDB connection function

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for frontend running on port 3001
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests only from frontend on port 3001
    methods: ["GET", "POST"], // Allow specific methods
    credentials: true, // Enable cookies to be sent with requests (if needed)
  })
);

// ✅ Connect MongoDB
connectDB();

// ✅ Test API - Check if backend is working
app.get("/", (req, res) => {
  res.send("SmartGrader Backend is Running!");
});

// ✅ Grade Submission Example API (Can be removed later)
app.post("/submit-grades", (req, res) => {
  const { studentName, grade } = req.body;
  res.status(200).json({ message: "Grade received!", studentName, grade });
});

// ✅ Routes for User and Exam (as you have these routes)
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));

// ✅ Add Exam Submission Routes (POST /api/submissions/submit)
app.post("/api/submissions/submit", (req, res) => {
  const { studentId, examId, answers } = req.body;

  // Log received data (you can process it further or save it in a database)
  console.log("Received Submission:", studentId, examId, answers);

  // Send a response back to the client
  res.status(200).json({ message: "Exam submitted successfully!" });
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
