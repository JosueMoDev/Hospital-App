import { Schema, model, Document, Types, Model } from "mongoose";

interface IClinic extends Document {
  register_number: string;
  name: string;
  phone: string;
  country?: string;
  province: string;
  city: string;
  street: string;
  validationState: boolean;
  photo?: string;
  photo_id?: string;
  user: Types.ObjectId;
  hasAssignments: boolean;
}

const ClinicSchema = new Schema<IClinic>({
  register_number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  province: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
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
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  hasAssignments: {
    type: Boolean,
    default: false,
  },
});

ClinicSchema.method("toJSON", function (this: IClinic) {
  const { __v, _id, ...object } = this.toObject();
  object.clinic_id = _id;
  return object;
});

export const Clinic: Model<IClinic> = model("Clinic", ClinicSchema);