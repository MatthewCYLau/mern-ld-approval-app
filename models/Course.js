const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = Course = mongoose.model("course", CourseSchema);
