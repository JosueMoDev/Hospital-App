import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path  from 'path';
import multer from 'multer';
import  { handlerPhotoValidation } from './helpers';
import { dbConnection } from './database/config';

dotenv.config();

const app = express();


//cors
app.use(cors());

//read and parse body
app.use(express.json());

// use static dir
app.use(express.static("public"));

// data base
dbConnection();

app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
  destination: path.join(__dirname, "./public/uploads"),
  filename: (req, file, callback ) => {
    callback(null, new Date().getTime() + file.originalname);
  },
});
app.use(
    multer({
        fileFilter: (req: any, file: any, callback: any) => {
            if (handlerPhotoValidation(file)) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        },
        storage,
    }).single("photo")
);

//Routes

app.use("/api/search", require("./routes/searching"));
app.use("/api/appointments", require("./routes/appointment"));
app.use("/api/clinics", require("./routes/clinics.route"));
app.use("/api/clinic-assignments", require("./routes/clinic-assignment"));
app.use("/api/file", require("./routes/files"));
app.use("/api/login", require("./routes/auth"));
app.use("/api/patient-records", require("./routes/patient-record"));
app.use("/api/patients", require("./routes/patient"));
app.use("/api/users", require("./routes/users"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(" server is running on " + process.env.PORT);
});
