const express = require("express");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
const errorHandler = require("./middleware/error");
app.use(errorHandler);

const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
// Load env vars
dotenv.config({ path: "./config/config.env" });
// Connect to database
connectDB();

// File uploading
// app.use(fileupload());

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// Route files
const auth = require("./routes/auth");
const profiles = require("./routes/profiles");
// const photo = require("./routes/photo");

// Cookie parser
app.use(cookieParser());

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/auth", auth);
app.use("/api/profiles", profiles);

const PORT = process.env.PORT || 3000;

const server = app.listen(
  PORT,
  console.log(`Server is running on port: ${PORT}`)
);

// // Handle unhandled promise rejections
// process.on("unhandledRejection", (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server & exit promise
//   server.close(() => process.exit(1));
// });
