const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const dotenv = require("dotenv");
const cors = require("cors");
const compression = require("compression");

const stateControllers = require("./controllers/stateControllers");
const historyControllers = require("./controllers/historyControllers");
const globalErrorHandler = require("./controllers/errorController");
//const renderPage = require("./controllers/viewController");
const updateDB = require("./scrapeData/main");

// this is only for development
// dotenv.config({ path: "./config.env" });

const app = express();

// DATABASE
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected."));

// global middlewares

// Set security HTTTP headers
app.use(helmet());

//  Development logger
app.use(morgan("dev"));

// Limit requests from same IP
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from the same IP. Please try again in one hour.",
});

app.use("/api", limiter);

// body parser
app.use(express.json());

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS attacks
app.use(xss());

// For cors
app.use(cors());

// for compressing the text responses to client
app.use(compression());

// for static files
app.use(express.static("public"));

// routes -- only two

app.get("/api/v1/states", stateControllers.getAllStates);
app.get("/api/v1/history", historyControllers.getAllHistory);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler --- differentiates between production and development errors
app.use(globalErrorHandler);

// server is started here
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App has started at port no. ${PORT}.`);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXCEPTIONS! Shutting down.");

  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTIONS! Shutting down.");
  server.close(() => {
    process.exit(1);
  });
});

//  this updates the db every one hour if conditions suffice
//  --look in scrape data for more info --- 

setInterval(updateDB, 1000 * 60 * 60);
