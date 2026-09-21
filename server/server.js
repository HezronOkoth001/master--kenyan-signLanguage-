const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 5000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(cookieParser());

app.use(express.json({
  limit: "20mb",
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("Kenyan Sign Language backend is running!");
});

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
