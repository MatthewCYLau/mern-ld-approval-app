const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Course = require("../../models/Course");
const User = require("../../models/User");

// @route    POST api/courses
// @desc     Create a course
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Course name is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newCourse = new Course({
        provider: req.body.provider,
        name: req.body.name,
        approved: req.body.approved,
        user: req.user.id
      });

      const course = await newCourse.save();

      res.json(course);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/courses
// @desc     Get all courses
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort({ date: -1 });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/courses
// @desc     Get my courses
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const courses = await Course.find({
      user: req.user.id
    });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/courses/:id
// @desc     Get course by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    // Check for ObjectId format and course
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    EDIT api/courses/:id
// @desc     Edit a course
// @access   Private
router.patch("/:id", auth, async (req, res) => {
  const { name, provider } = req.body;

  // Build course object
  const courseFields = {};

  if (name) courseFields.name = name;
  if (provider) courseFields.provider = provider;

  try {
    let course = await Course.findOneAndUpdate(
      { user: req.user.id },
      courseFields,
      { new: true, upsert: true }
    );
    // Check for ObjectId format and course
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Check user
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    return res.status(200).json(course);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/courses/:id
// @desc     Delete a course
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    // Check for ObjectId format and course
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    // Check user
    if (course.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await course.remove();

    res.json({ msg: "Course removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    PUT api/courses/like/:id
// @desc     Like a course
// @access   Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    // Check if the course has already been liked
    if (
      course.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Course already liked" });
    }

    course.likes.unshift({ user: req.user.id });

    await course.save();

    res.json(course.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/courses/unlike/:id
// @desc     Like a course
// @access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    // Check if the course has already been liked
    if (
      course.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Course has not yet been liked" });
    }

    // Get remove index
    const removeIndex = course.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    course.likes.splice(removeIndex, 1);

    await course.save();

    res.json(course.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
