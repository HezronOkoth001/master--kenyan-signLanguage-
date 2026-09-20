const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./config/database");
const blogRoutes = require("./routes/blogs");
const authRoutes = require("./routes/auth");

const app = express();

const PORT = 5000;


// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


// ========================================
// JSON
// ========================================

app.use(
  express.json({
    limit: "20mb",
  })
);


// ========================================
// SERVE UPLOADED IMAGES
// ========================================

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ========================================
// HOME ROUTE
// ========================================

app.get("/", (req, res) => {
  res.send(
    "Kenyan Sign Language backend is running!"
  );
});


// ========================================
// BLOG ROUTES
// ========================================

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);


// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(
    `Backend server running on http://localhost:${PORT}`
  );
});