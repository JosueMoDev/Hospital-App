const { response } = require('express');


const getAppointments = async (req, resp = response) => { 
   
    try {
        resp.status(200).json({
            ok: true,
            message: ' Getting All Appointments ....',
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Appointment'
        });
    }

}

const createAppointment = async (req, resp = response) => { 

    const appointment = req.body;
  
    try {
        resp.status(200).json({
            ok: true,
            message: ' Appointment created success',
            appointment
        });
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Comunicate with a system admin, we couldnt create an Appointment'
        });  
    }
}

const updateAppointment = async (req, resp = response) => { 
    const appointment_id = req.params.id;

    try {
        resp.status(200).json({
            ok: true,
            message: `Appointment ${ appointment_id } has updated success`,
        });
    } catch (error) {   
        resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
    const deleteAppointement = async (req, resp = response) => { 
        
        const appointment_id = req.params.id;
        try {
            resp.status(200).json({
                ok: true,
                message: ` Appointment ${appointment_id} deleted`, 
            });

        } catch (error) {  
            console.log(error)
            resp.status(500).json({
                ok: false,
                message:'something was wrong'
            });
            
        }
    }
        
module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointement }