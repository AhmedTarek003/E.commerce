const express = require("express");
require("dotenv").config();
const connectDB = require("./db/connectDb");
const cors = require("cors");
const globalError = require("./middlewares/globalError");
// Security
const xss = require("xss-clean");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
// DB
connectDB();

// App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// security middlewares
app.use(helmet());
app.use(hpp());
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 200,
  })
);
app.use(xss());

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/products", require("./routes/productsRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/orders", require("./routes/oredersRoute"));
app.use("/api/checkout", require("./routes/stipeRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

// Wrong Route
app.use("*", (req, res, next) => {
  next(new Error("this is route not found"));
});

// Global Errors Handlers
app.use(globalError);

// Server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () =>
  console.log(`App is Running in port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled rejection ${err.name} | ${err.message}`);
  server.close(() => {
    console.log("Shut Down....");
    process.exit(1);
  });
});
