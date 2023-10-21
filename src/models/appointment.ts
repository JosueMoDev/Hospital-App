import { Schema, model, Document, Types, Model } from "mongoose";

interface IAppointment extends Document {
  start: Date;
  end: Date;
  title: string;
  clinic: Types.ObjectId;
  clinic_info: string;
  doctor: Types.ObjectId;
  doctor_info: string;
  patient: Types.ObjectId;
  createdby: Types.ObjectId;
}

const AppointmentSchema = new Schema<IAppointment>({
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  clinic: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Clinic",
  },
  clinic_info: {
    required: true,
    type: String,
  },
  doctor: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  doctor_info: {
    required: true,
    type: String,
  },
  patient: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  createdby: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

AppointmentSchema.method("toJSON", function (this: IAppointment) {
  const { __v, _id, ...object } = this.toObject();
  object.appointment_id = _id;
  return object;
});

export const Appointment: Model<IAppointment> = model(
  "Appointment",
  AppointmentSchema
);

