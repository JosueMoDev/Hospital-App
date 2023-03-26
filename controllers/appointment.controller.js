const { response } = require('express');
const Clinic = require('../models/clinic.model');
const Appointment = require('../models/appoiment.model');
const User = require('../models/user.model');

const { JWTGenerated } = require('../helpers/JWT.helpers');

const getAppointments = async (req, resp = response) => { 
   
    try {
        // const pagination = Number(req.query.pagination) || 0;
        const [appointments, total] = await Promise.all([

            Appointment
                .find()
                // .skip(pagination)
                // .limit(5)
                .populate('patient','id'),
            
            Appointment.count()

        ]);
    
        resp.json({
            ok: true,
            message:'getting Appointments ....',
            appointments,
            total
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' We Couldnt Get Any Appointment'
        });
    }

}

const createAppointment = async (req, resp = response) => { 
    const { clinic, doctor, start, end, title, patient, createdby } = req.body;
    try {
        
        const isClinicAvilable =  await Clinic.findById(clinic);
        if (!isClinicAvilable) { 
            return resp.status(400).json({
                ok: false,
                message: 'This clinic is not avilable to make an appointment'
            });
        }
        const isDoctorAvilable =  await User.findById(doctor);
        if (!isDoctorAvilable) { 
            return resp.status(400).json({
                ok: false,
                message: 'This Doctor is not avilable to make an appointment'
            });
        }
               
        const appointment = new Appointment(req.body);  
        appointment.doctor_info = `${isDoctorAvilable.name} ${isDoctorAvilable.lastname}`
        appointment.clinic_info = `${isClinicAvilable.name} - ${isClinicAvilable.province}/${isClinicAvilable.city}`
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
    const appointment = req.params.id;

    try {
        const { start, end, clinic, doctor, ...fields } = req.body;
        const curret_appointment = await Appointment.findById(appointment);
        const curret_clinic = await Clinic.findById(clinic);
        const curret_doctor = await User.findById(doctor);

        if (!curret_appointment) { 
            return resp.status(404).json({
                ok: false,
                message:'We couldnt find any Appointment'
            });
        }
        if (!curret_clinic) { 
            return resp.status(404).json({
                ok: false,
                message:'We couldnt find Clinic'
            });
        }
        if (!curret_doctor && curret_doctor.rol!=='doctor') { 
            return resp.status(404).json({
                ok: false,
                message:'We couldnt find Doctor'
            });
        }

        fields.start = start;
        fields.end = end;
        fields.clinic = clinic;
        fields.clinic_info = `${curret_clinic.name} - ${curret_clinic.province}/${curret_clinic.city}`;   
        fields.doctor = doctor;  
        fields.doctor_info = `${curret_doctor.name} ${curret_doctor.lastname}`;
        
        await Appointment.findByIdAndUpdate(appointment, fields, { new: true });

        return resp.status(200).json({
            ok: true,
            message: 'Appointment has been updated',
        });
    } catch (error) {   
        return resp.status(500).json({
            ok: false,
            message:'something was wrong'
        });
        
    }
}
    
const deleteAppointement = async (req, resp = response) => { 
    
    const appointment = req.params.id;
    const user_logged_id = req.query.user
    
    try {
        const appointment_to_delete = await Appointment.findById(appointment);
        const user_logged = await User.findById(user_logged_id);
        if (!appointment_to_delete) {
            return resp.status(404).json({
                ok: false,
                message: `We couldn't find any appointment at database`
            })
        }
        
        if (user_logged.rol === 'doctor' ) {
            return resp.status(404).json({
                ok: false,
                message: `Forbidden action`
            })
        }
   
        await Appointment.findByIdAndDelete(appointment);
     
        return resp.status(200).json({
            ok: true,
            message: `Appointment has been deleted`,
        })

    }catch (error) {
        resp.status(500).json({
            ok: false,
            message:'Something was wrong'
        });
    }
}
        
module.exports = { getAppointments, createAppointment, updateAppointment, deleteAppointement }