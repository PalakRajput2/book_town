const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");

const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

const app = express();

// CORS Configuration
const allowedOrigins = ["https://inspiring-elf-965a66.netlify.app"]; // Replace with your frontend domain
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "id", "bookid"],
    credentials: true, // Allow cookies if needed
  })
);

// Handle Preflight Requests
app.options("*", cors());

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Debugging Middleware to Log Incoming Requests
app.use((req, res, next) => {
  console.log(`Incoming Request: Method - ${req.method}, URL - ${req.url}`);
  next();
});

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Default Root Route
app.get("/", (req, res) => {
  res.status(200).send("Backend is running smoothly!");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  if (err.message === "Not allowed by CORS") {
    return res.status(403).send("CORS error: Access not allowed");
  }
  res.status(500).send("Internal Server Error");
});

// Start Server
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
