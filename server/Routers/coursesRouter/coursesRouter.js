const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const destinationPath = "./public/Images";

    // Check if the directory exists, if not, create it
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }

    cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// ,

const upload = multer({ storage: storage });
const {
  createCourse,
  getAllCourses
} = require("../../Controllers/CoursesController/coursesController");
// router.post("/createCourse",upload.single('image'),createCourse)
router.post(
  "/createCourse",
  upload.fields([
    { name: "attachment", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  createCourse
);
router.get("/getCourses",getAllCourses)
// getCourses

module.exports = router;
