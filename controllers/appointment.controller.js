const { response } = require('express');
const Clinic = require('../models/clinic.model');
const Appointment  = require('../models/appoiment.model');
const { JWTGenerated } = require('../helpers/JWT.helpers');

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
    const { clinic, doctor, date, patient, createdby } = req.body;
    try {
        
        const isClinicAvilable =  await Clinic.findById(clinic);
        if (!isClinicAvilable) { 
            return resp.status(400).json({
                ok: false,
                message: 'This clinic is not avilable to make an appointment'
            });
        }
        // const isDateAvilable = await Appointment.findOne({ date });
        // if (isDateAvilable) { 
        //     return resp.status(400).json({
        //         ok: false,
        //         message: `this date it not avilable`
        //     });
        // }
        // console.log('error')
        
        const appointment = new Appointment(req.body);  
        await appointment.save();
        
        
        // Generate a JWT 
        const token = await JWTGenerated(appointment.createdby);     
        return resp.status(200).json({
            ok: true,
            message: 'Appoitment has been created success',
            appointment,
            token
        });
        
    } catch (error) {
        return resp.status(500).json({
            ok: false,
            message: 'Something was wrong'
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