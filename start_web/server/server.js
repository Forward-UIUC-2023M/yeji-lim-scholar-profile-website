// const http = require('http');

// const server = http.createServer((req,res) => {
//     res.write("Hello");
//     res.end();
// });

// const PORT = 8000

// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const app = express();
// const cors = require("cors");
const morgan = require("morgan");
// const fileupload = require("express-fileupload");

// const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

const connectDB = require("./config/db");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// File uploading
// app.use(fileupload());

// Set static folder
// app.use(express.static(path.join(__dirname, "public")));

// app.use(cors());

// Route files
// const auth = require("./routes/auth");
const profiles = require("./routes/profiles");
// const photo = require("./routes/photo");

// Body parser
app.use(express.json());

// Cookie parser
// app.use(cookieParser());

// Dev loggin middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Mount routers
// app.use("/api/v1/auth", auth);
app.use("/api/profiles", profiles);

app.use(errorHandler);

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
