const { Schema, model } = require("mongoose");

const ClinicAssignmentSchema = Schema({
  clinic: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
  doctor: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
ClinicAssignmentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("ClinicAssignments", ClinicAssignmentSchema);
