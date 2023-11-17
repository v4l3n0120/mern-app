const express = require("express")
const multiparty = require("connect-multiparty")
const CourseControllers = require("../controllers/course.controllers")
const md_auth = require("../middlewares/authenticated")
const md_upload = multiparty({ uploadDir: "./uploads/course"})


const api = express.Router()

api.post("/course", [md_auth.asureAuth, md_upload], CourseControllers.createCourse)
api.get("/course", CourseControllers.getCourse)
api.patch("/course/:id", [md_auth.asureAuth, md_upload], CourseControllers.updateCourse)
api.delete("/course/:id", [md_auth.asureAuth], CourseControllers.deleteCourse)
module.exports = api