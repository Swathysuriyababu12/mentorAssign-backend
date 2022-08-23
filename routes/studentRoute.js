const express = require("express");
const router = express.Router();

const student = require("../models/studentSchema");

router.get("/", async (req, res) => {
  console.log("student details");
  try {
    const data = await student.find();
    res.send(data);
    console.log(data);
  } catch (err) {
    res.status(501).send({ message: "error occured" });
  }
});

router.post("/", async (req, res) => {
  try {
    const details = await student.create({
      name: req.body.name,
      email: req.body.email,
      course: req.body.course,
      mentorAssigned: req.body.mentorAssigned,
    });
    res.send(details);
  } catch (err) {
    res.status(404).send({ message: "student with this email already exists" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const studentDetails = await student
      .findById(req.params.id)
      .populate("mentorAssigned", "name");
    res.send(studentDetails);
  } catch (err) {
    res.status(504).send(err);
  }
});

module.exports = router;
