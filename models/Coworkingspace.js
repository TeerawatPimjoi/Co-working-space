const mongoose = require("mongoose");
const CoWorkingSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"]
    },
    address: {
      type: String,
      required: [true, "Please add a address"]
    },
    tel: {
      type: String
    },
    openclosetime: {
      type: String
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

module.exports =mongoose.model('Coworkingspace',CoWorkingSpaceSchema);