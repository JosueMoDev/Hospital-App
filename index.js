const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')
const path = require('path');
const app = express();

const multer  = require('multer')


//cors
app.use(cors());
//read and parse body

app.use(express.json());

// use static dir 
app.use(express.static('public'));

// data base
dbConnection();


//Img
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const storage = multer.diskStorage({
    destination: path.join(__dirname, './public/uploads'),
    filename: (req, file, callback) => { 
        callback(null, new Date().getTime()+file.originalname);

    }
});
app.use(multer({ storage }).single('image'));

//Routes 

app.use('/api/users', require('./routes/users.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/doctors', require('./routes/doctors.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/appointment', require('./routes/appointment.route'));
app.use('/api/patient', require('./routes/patient.route'));
app.use('/api/patient-record', require('./routes/patient-record.route'));




app.use('/api/all', require('./routes/searchingAll.route'));
//TODO: valations error must be checked
app.use('/api/file', require('./routes/files.route'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});


app.listen(process.env.PORT, () => { console.log(' server is running on ' + process.env.PORT) });
