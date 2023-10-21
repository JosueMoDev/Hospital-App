import { Schema, model, Document, Model } from "mongoose";

interface IPatient extends Document {
  document_type: string;
  document_number: string;
  email: string;
  password: string;
  name: string;
  lastname: string;
  gender: string;
  phone: string;
  validationState: boolean;
  photo?: string;
  photo_id?: string;
  rol: string;
  email_provider: string;
  email_name: string;
}

const PatientSchema = new Schema<IPatient>({
  document_type: {
    type: String,
    required: true,
  },
  document_number: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  validationState: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
  },
  photo_id: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    default: "patient",
  },
  email_provider: {
    type: String,
    required: true,
  },
  email_name: {
    type: String,
    required: true,
  },
});

PatientSchema.method("toJSON", function (this: IPatient) {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const Patient: Model<IPatient> = model("Patient", PatientSchema);

