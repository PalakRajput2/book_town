const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
require("./conn/conn");

// Import routes
const User = require("./routes/user");
const Books = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

// Restrict CORS to specific frontend URL (Netlify)
const allowedOrigins = ["https://inspiring-elf-965a66.netlify.app"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
    credentials: true, // Allow cookies if needed
  })
);

app.use(express.json());

// Routes
app.use("/api/v1", User);
app.use("/api/v1", Books);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// Creating port
const port = 1000;
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
