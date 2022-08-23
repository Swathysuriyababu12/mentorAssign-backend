const express = require("express");
const router = express.Router();

const mentor = require("../models/mentorSchema");

router.get("/", async (req, res) => {
  try {
    const details = await mentor.find();
    res.send(details);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const data = await mentor.create({
      name: req.body.name,
      email: req.body.email,
      expertise: req.body.expertise,
      studentsAssigned: req.body.studentsAssigned,
    });
    res.send(data);
  } catch (err) {
    res.status(404).send(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const mentorDetails = await mentor
      .findById(req.params.id)
      .populate("studentsAssigned", "name");
    res.send(mentorDetails);
  } catch (err) {
    res.status(504).send(err);
  }
});

module.exports = router;
