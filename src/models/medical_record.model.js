const { Schema, model } = require("mongoose");

const MedicalRecordsSchema = Schema({
  doctor: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  patient: {
    require: true,
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  document_number: {
    require: true,
    type: String,
  },
  date: {
    require: true,
    type: Date,
  },
  title: {
    riquire: true,
    type: String,
  },
  body: {
    require: true,
    type: String,
  },
  edited_by: {
    type: Schema.Types.ObjectId,
  },
  last_edited_date: {
    type: Date,
  },
});
MedicalRecordsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("MedicalRecords", MedicalRecordsSchema);
