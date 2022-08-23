const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  course: {
    type: String,
    required: true,
  },
  mentorAssigned: {
    type: Schema.Types.ObjectId,
    default: null,
    ref: "mentor",
  },
});

const student = mongoose.model("student", studentSchema);

module.exports = student;
