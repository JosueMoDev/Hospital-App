const { response } = require('express');
const { insertPhotoOn } = require('../helpers/insertPhotoOn.helpers');
  
const uploadFile = async (req, resp = response) => { 
    const folder = req.params.folder;
    const id = req.params.id;
    const file = req.file
    

    if (!file) {    
        return resp.status(400).json({
            ok: false,
            message: `you don't provide any photo`,
            
        });
    }

    const isPathAvailable = ['hospitals', 'doctors', 'users', 'patients'];
    //  validate if one those folders are avilable on claudinary
    if (!isPathAvailable.includes(folder)) {    
        return resp.status(400).json({
            ok: false,
            message: 'path not found',
            
        });
    }
    
    
    // get file extension
    const nameChunck = file.originalname.split('.');
    const fileExtension = nameChunck[nameChunck.length - 1];
    // validate extesion 
    const allowedExtension = ['jpg', 'png', 'jpeg', 'gif'];
    if (!allowedExtension.includes(fileExtension)) { 
        return resp.status(400).json('extension file not allow');
    }
    
   
    // here we insert or update the photo depending on the EndPoint
    await insertPhotoOn(folder, id, file.originalname, file.path);

    resp.status(200).json({
    ok: true,
    message: 'File upload success',
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