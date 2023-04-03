const { response } = require("express");
const User = require("../models/user.model");
const Clinic = require("../models/clinic.model");
const Appointment = require("../models/appointment.model");
const Patient = require("../models/patient.model");

const clinicBrowser = async (req, resp = response) => {
  const query = req.params.query;
  const regexpresion = new RegExp(query, "i");
  console.log(regexpresion)
  try {
    const [users, patients, clinics, appointments] = await Promise.all([
      User.find({ name: regexpresion }),
      Patient.find({ name: regexpresion }),
      Clinic.find({ name: regexpresion }),
      Appointment.find({ title: regexpresion }).populate('patient', 'photo name lastname phone')
    ]);
    data = [...users,...patients,...clinics, ...appointments]
    return resp.status(200).json({
      ok: true,
      data,
    });
  } catch (error) {
    resp.status(500).json({
      ok: false,
      message: `Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it`,
    });
  }
};
module.exports = { clinicBrowser };
