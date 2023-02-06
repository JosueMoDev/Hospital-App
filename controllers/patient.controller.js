const { response } = require('express');


const getPatient = async (req, resp = response) => { 
   
    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting All Patients ....',
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Patients'
        });
    }

}

const createPatient = async (req, resp = response) => { 

    const patient = req.body;
  
    try {
        resp.status(200).json({
            ok: true,
            message: ' Patient created success',
            patient
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt create an Patient'
        });  
    }
}

const updatePatient = async (req, resp = response) => { 
    const patient_id = req.params.id;

    try {
        resp.status(200).json({
            ok: true,
            message: `patient ${ patient_id } has updated success`,
        });
    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deletePatient = async (req, resp = response) => { 
        
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
        
module.exports = { getPatient, createPatient, updatePatient, deletePatient }