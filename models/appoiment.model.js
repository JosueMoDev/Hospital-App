const { Schema, model } = require("mongoose");

const AppointmentSchema = Schema({
  start: {
    type: Date,
    require: true,
  },
  end: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  clinic: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
  clinic_info: {
    require: true,
    type: String,
  },
  doctor: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor_info: {
    require: true,
    type: String,
  },
  patient: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  createdby: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

AppointmentSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.appointment_id = _id;
  return object;
});

module.exports = model("Appointment", AppointmentSchema);
