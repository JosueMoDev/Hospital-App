const { response } = require('express');


const getPatientRecord = async (req, resp = response) => { 
   
    try {
        resp.status(200).json({
            ok: true,
            message: ' Get Patient Record ....',
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Patient record'
        });
    }

}

const createPatientRecord = async (req, resp = response) => { 

    const patient_record = req.body;
  
    try {
        resp.status(200).json({
            ok: true,
            message: ' Patient record to 0879890-1 created success',
            patient_record
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt create an Patient'
        });  
    }
}

const updatePatientRecord = async (req, resp = response) => { 
    const patient_id = req.params.id;

    try {
        resp.status(200).json({
            ok: true,
            message: `patient record  ${ patient_id } has updated success`,
        });
    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deletePatientRecord = async (req, resp = response) => { 
        
        const patient_id = req.params.id;
        try {
            resp.status(200).json({
                ok: true,
                message: ` Patient ${patient_id} deleted`, 
            });

        } catch (error) {  
            console.log(error)
            resp.status(500).json({
                ok: false,
                message:'something was wrong'
            });
            
        }
    }
        
module.exports = { getPatientRecord, createPatientRecord, updatePatientRecord, deletePatientRecord }