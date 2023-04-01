const { response } = require("express");
const User = require("../models/user.model");
const Clinic = require("../models/clinic.model");
const Appointment = require("../models/appointment.model");
const Patient = require("../models/patient.model");

const clinicBrowser = async (req, resp = response) => {
  const filter = req.params.filter;
  const query = req.params.query;
  const regexpresion = new RegExp(query, "i");
  try {
    let data = [];
    switch (schema='person') {
      case "person":
        const [users, patients ] = await Promise.all([
          User.find({ name: regexpresion }),
          Patient.find({ name: regexpresion }),
        ]);
        data = [...users, ...patients]
        break
      case "clinic":
        data = await Clinic.find({ name: query });
        break;
      
      case "appointment":
        data = await Appointment.find({ name: query });
        break;
      
      default:
        return resp.status(400).json({
          ok: false,
          message: `You should search into the following paths `,
        });
    }
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
