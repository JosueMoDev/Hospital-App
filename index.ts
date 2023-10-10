import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path  from 'path';
import multer from 'multer';
const { handlerPhotoValidation } = require("./helpers/handlerFile.helper");
const { dbConnection } = require("./database/config");

dotenv.config();

const app = express();


const { response } = express();
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
  filename: (req: any, file : any, callback: any ) => {
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

// app.use("/api/search", require("./routes/searching.route"));
// app.use("/api/appointments", require("./routes/appointment.route"));
// app.use("/api/clinics", require("./routes/clinics.route"));
// app.use("/api/clinic-assignments", require("./routes/clinic-assignment.route"));
// app.use("/api/file", require("./routes/files.route"));
// app.use("/api/login", require("./routes/auth.route"));
// app.use("/api/patient-records", require("./routes/patient-record.route"));
// app.use("/api/patients", require("./routes/patient.route"));
// app.use("/api/users", require("./routes/users.route"));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "public/index.html"));
// });

app.listen(process.env.PORT, () => {
  console.log(" server is running on " + process.env.PORT);
});
