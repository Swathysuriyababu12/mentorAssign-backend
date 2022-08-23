const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDb = require("./db");
const student = require("./models/studentSchema");
const mentor = require("./models/mentorSchema");
const studentRoute = require("./routes/studentRoute");
const mentorRoute = require("./routes/mentorRoute");
const assignmentorRoute = require("./routes/studentAssign");
const app = express();
app.use(cors());
app.use(express.json());

port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("working and listening");
});

app.use("/student", studentRoute);
app.use("/mentor", mentorRoute);
app.use("/assignMentor", assignmentorRoute);

app.listen(process.env.PORT, async (err) => {
  await connectDb();
  console.log(`connected backend ${port}`);
  if (err) {
    console.log(err, "error in starting the errror");
  }
});
