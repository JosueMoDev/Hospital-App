import mongoose from 'mongoose';

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.CHAINCONNECTION!);
    console.log("Data base up");
  } catch (error) {
    console.log(error);
    throw new Error("Data base connection error");
  }
};
