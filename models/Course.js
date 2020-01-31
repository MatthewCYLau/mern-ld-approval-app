const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean,
    default: false
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ]
});

module.exports = Course = mongoose.model("course", CourseSchema);
