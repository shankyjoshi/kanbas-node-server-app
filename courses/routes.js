import Database from "../Database/index.js";
let dbCourses = Database.courses;
function CourseRoutes(app) {
  app.get("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = dbCourses.find((c) => c._id === id);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

  app.get("/api/courses", (req, res) => {
    const courses = dbCourses;
    res.send(courses);
  });

  app.post("/api/courses", (req, res) => {
    const course = { ...req.body };
    dbCourses.push(course);
    res.send(course);
  });

  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    dbCourses = dbCourses.filter((c) => c._id !== id);
    res.sendStatus(204);
  });

  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    dbCourses = dbCourses.map((c) => (c._id === id ? { ...c, ...course } : c));
    res.sendStatus(204);
  });
}
export default CourseRoutes;
