const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

//connect to database
connectDB();

const app = express();
//body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//set security header
app.use(helmet());

//prevent xss attack
app.use(xss());

//Rate limiting
const Limiter = rateLimit({
  windowMS: 10 * 60 * 1000, // 10 mins
  max: 1000
});
app.use(Limiter);

//prevent http param pollutions
app.use(hpp());

//enable CORS
app.use(cors());

const coworkingspaces = require("./routes/coworkingspaces");
const reservations = require("./routes/reservations");
const auth = require("./routes/auth");

app.use("/api/v1/coworkingspaces", coworkingspaces);
app.use("/api/v1/auth", auth);
app.use("/api/v1/reservations", reservations);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log("Server running in", process.env.NODE_ENV, "mode on port", PORT)
);
//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Close server & exit process
  server.close(() => process.exit(1));
});
