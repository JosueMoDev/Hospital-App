import { Schema, model, Document, Types, Model } from "mongoose";

interface IMedicalRecord extends Document {
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  document_number: string;
  date: Date;
  title: string;
  body: string;
  edited_by?: Types.ObjectId;
  last_edited_date?: Date;
}

const MedicalRecordsSchema = new Schema<IMedicalRecord>({
  doctor: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  patient: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  document_number: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  title: {
    required: true,
    type: String,
  },
  body: {
    required: true,
    type: String,
  },
  edited_by: {
    type: Schema.Types.ObjectId,
  },
  last_edited_date: {
    type: Date,
  },
});

MedicalRecordsSchema.method("toJSON", function (this: IMedicalRecord) {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const MedicalRecords: Model<IMedicalRecord> = model(
  "MedicalRecords",
  MedicalRecordsSchema
);