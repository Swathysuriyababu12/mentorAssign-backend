const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mentorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  expertise: {
    type: String,
    required: true,
  },
  studentsAssigned: [
    {
      type: Schema.Types.ObjectId,
      ref: "student",
      default: null,
    },
  ],
});

const mentor = mongoose.model("mentor", mentorSchema);

module.exports = mentor;
