import Lab5 from "./Lab5.js";
import Hello from "./hello.js";
import express from "express"; // import express framework
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import assignmentsRoutes from "./assignments/routes.js";
import "dotenv/config";
const app = express(); // create express app
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
// register get api
Hello(app);

CourseRoutes(app);
ModuleRoutes(app);
assignmentsRoutes(app);
Lab5(app);

app.listen(process.env.PORT || 4000);
