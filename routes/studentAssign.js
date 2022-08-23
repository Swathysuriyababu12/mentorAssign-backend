const router = require("express").Router();
const mongoose = require("mongoose");
const objId = mongoose.Types.ObjectId;

const student = require("../models/studentSchema");
const mentor = require("../models/mentorSchema");

//req has mentor id and studentArray(which has an array of existing student ids)

router.post("/newMentor", async (req, res) => {
  console.log("mentor assigned");
  try {
    const mentorData = await mentor.findById(req.body.mentorId);
    console.log(...mentorData.studentsAssigned);
    mentorData.studentsAssigned = [
      ...mentorData.studentsAssigned, //studentId is passed and added into mentor data for each mentor id
      ...req.body.studentsArray,
    ];
    mentorData.save();

    req.body.studentsArray.forEach(async (stud) => {
      var temporary = await student.findById(stud);
      temporary.mentorAssigned = req.body.mentorId; //find each student and update the mentor details
      temporary.save();
    });

    res.send(mentorData);
  } catch (err) {
    res.status(404).send(err);
  }
});

//modification of mentor // req has both student id and mentor id(new)

router.post("/modifyMentor", async (req, res) => {
  //modifying in student details
  try {
    var studentDetails = await student.findById(req.body.studentId);
    console.log(studentDetails);
    const oldMentorId = studentDetails.mentorAssigned; //required for later use
    console.log(oldMentorId);
    studentDetails.mentorAssigned = req.body.newMentorId;
    studentDetails.save();

    //modifying the student  details in mentor details

    var mentorOld = await mentor.findById(oldMentorId);
    console.log(mentorOld);
    if (mentorOld.studentsAssigned.length < 0) {
      console.log(mentorOld);
      return;
    } else {
      let newAssigned = mentorOld.studentsAssigned;
      const indexpos = newAssigned.indexOf(objId(req.body.studentId));
      console.log(objId(req.body.studentId));
      console.log(indexpos, "index");
      newAssigned.pop(indexpos);
      console.log(newAssigned);
      mentorOld.studentsAssigned = newAssigned;
    }

    //filter out the students

    let newment = await mentor.findById(req.body.newMentorId);
    if (newment.studentsAssigned.length < 0) {
      return;
    } else {
      if (!newment.studentsAssigned.includes(req.body.studentId)) {
        newment.studentsAssigned = [
          ...newment.studentsAssigned,
          req.body.studentId,
        ];
      }
    }
    newment.save();

    res.send(
      "Updated mentor to respective student , updated in oldmentor and new mentor studentsAssigned list"
    );
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

module.exports = router;
