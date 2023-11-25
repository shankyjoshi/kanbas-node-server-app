import Lab5 from "./Lab5.js";
import Hello from "./hello.js";
import express from "express"; // import express framework
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import assignmentsRoutes from "./assignments/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import UserRoutes from "./users/routes.js";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

mongoose.connect(CONNECTION_STRING);

const app = express(); // create express app

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

//THis needs to between cors and express json middleware
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

// register get api
Hello(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
assignmentsRoutes(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
