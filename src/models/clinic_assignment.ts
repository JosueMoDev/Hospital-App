import { Schema, model, Document, Types, Model } from "mongoose";

interface IClinicAssignment extends Document {
  clinic: Types.ObjectId;
  doctor: Types.ObjectId;
}

const ClinicAssignmentSchema = new Schema<IClinicAssignment>({
  clinic: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
  doctor: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

ClinicAssignmentSchema.method("toJSON", function (this: IClinicAssignment) {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const ClinicAssignment: Model<IClinicAssignment> = model(
  "ClinicAssignments",
  ClinicAssignmentSchema
);
