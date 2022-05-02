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
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//cascade delete reservation when a coworkingspace is deleted
CoWorkingSpaceSchema.pre("remove", async function (next) {
  console.log(`Reservations being removed from coworkingspace ${this._id}`);
  await this.model(`Reservation`).deleteMany({ coworkingspace: this._id });
  next();
});

//reverse populate with virtual
CoWorkingSpaceSchema.virtual("reservations", {
  ref: "Reservation",
  localField: "_id",
  foreignField: "coworkingspace",
  justOne: false
});

module.exports = mongoose.model("Coworkingspace", CoWorkingSpaceSchema);
