import { Schema, model, Document, Model } from "mongoose";

interface IUser extends Document {
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
  isAssigned: boolean;
}

const UserSchema = new Schema<IUser>({
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
  },
  email_provider: {
    type: String,
    required: true,
  },
  email_name: {
    type: String,
    required: true,
  },
  isAssigned: {
    type: Boolean,
    required: true,
    default: false,
  },
});

UserSchema.method("toJSON", function (this: IUser) {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

export const User: Model<IUser> = model("User", UserSchema);