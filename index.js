const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConnection } = require('./database/config')

const app = express();
//cors
app.use(cors());
//read and parse body

app.use(express.json());

// data base
dbConnection();

//Routes 

app.use('/api/users', require('./routes/users.route'));
app.use('/api/login', require('./routes/auth.route'));


app.listen(process.env.PORT, () => { console.log (' server is running on '+ process.env.PORT) });