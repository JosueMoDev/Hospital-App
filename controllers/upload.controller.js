const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const {uploadImage } = require('../helpers/updataImage.helpers');



const uploadFile = async (req, resp = response) => { 
    
    const schema = req.params.schema;
    const id = req.params.id;
    const pathAvible = ['hospitals', 'doctors', 'users'];

    if (!pathAvible.includes(schema)) {    
        return resp.status(400).json({
            ok: false,
            message: 'path not found',
            
        });
    }
//Validate If we are sending a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return resp.status(400).json('No files were uploaded.');
    }
// processing file 
    const file = req.files.img;
    const nameChunck = file.name.split('.');
    const fileExtension = nameChunck[nameChunck.length - 1];

    // validate extesion 
    const allowedExtension = ['jpg', 'png', 'jpeg', 'gif'];
    if (!allowedExtension.includes(fileExtension)) { 
        return resp.status(400).json('extension file not allow');
    }
    // generate a file name
    const fileName = `${uuidv4()}.${fileExtension}`;

    // create a path
    const path = `./uploads/${schema}/${fileName}`;

    // move file to dir 
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return resp.status(500).json({
                ok: false,
                message: 'we could move the file to dir it was internal error'
            });
        }      
        // here we are goin to upload the file

        uploadImage(schema, id, fileName);

         resp.status(200).json({
            ok: true,
            message: 'File upload success',
            file:fileName
        });
      });
}

returnImage = async (req, resp = response) => { 
    const schema = req.params.schema;
    const file = req.params.file

    const imgPath = path.join(__dirname, `../uploads/${schema}/${file}`);
    if (fs.existsSync(imgPath)) {
        resp.sendFile(imgPath);
    } else { 
       //could be other static path// const imgPath = path.join(__dirname, `../uploads/${schema}/${file}`);
        resp.status(404).json({
            message:'we could find this img on path'
        });
    }
}

module.exports = { uploadFile, returnImage };