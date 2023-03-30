const { response } = require("express");
const User = require("../models/user.model");
const Patient = require("../models/patient.model");
const bcrypt = require("bcryptjs");
const { JWTGenerated } = require("../helpers/JWT.helpers");
const { googleTokenVerify } = require("../helpers/google-token-verify.helpers");
const { getMenuFrontEnd } = require("../helpers/menu-frontend.helpers");

const login = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const token = await JWTGenerated(user.id, user.rol);
    const menu = getMenuFrontEnd(user.rol);

    return resp.status(200).json({
      ok: true,
      message: "Welcome",
      token,
      menu,
      user: user.name,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};
const googleSignIn = async (req, resp = response) => {
  try {
    const { email } = await googleTokenVerify(req.body.token);
    const userIntoDB = await User.findOne({ email });

    if (!userIntoDB) {
      return resp.status(403).json({
        ok: false,
        message: "User Forbidden",
      });
    }

    const token = await JWTGenerated(userIntoDB.id);

    return resp.status(200).json({
      ok: true,
      user: userIntoDB.name,
      token,
      userIntoDB,
    });
      
  } catch (error) {
    return resp.status(400).json({
      ok: false,
      message: "Google identity verify: Token error",
    });
  }
};

const loginPatient = async (req, resp = response) => {
  const { email, password } = req.body;

  try {
    const user = await Patient.findOne({ email });

    if (!user) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const validatePassword = bcrypt.compareSync(password, user.password);

    if (!validatePassword) {
      return resp.status(400).json({
        ok: false,
        message: "You must check your credentials",
      });
    }

    const token = await JWTGenerated(user.id, user.rol);
    const menu = getMenuFrontEnd(user.rol);

    return resp.status(200).json({
      ok: true,
      message: " Welcome ",
      token,
      menu,
      user: user.name,
    });
      
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message: "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const googleSignInPatient = async (req, resp = response) => {
  try {
    const { email } = await googleTokenVerify(req.body.token);
    const userIntoDB = await Patient.findOne({ email });

    if (!userIntoDB) {
      return resp.status(403).json({
        ok: false,
        message: " User Forbidden",
      });
    }

    const token = await JWTGenerated(userIntoDB.id);

    return resp.status(200).json({
      ok: true,
      token,
      userIntoDB,
      user: userIntoDB.name,
    });
      
  } catch (error) {
    return resp.status(400).json({
      ok: false,
      message: "Google identity verify: Token error",
    });
  }
};

const renewToken = async (req, resp = response) => {
  const user_id = req.user_id;
  const token = await JWTGenerated(user_id);
  const user = await User.findById(user_id);
  if (!user) {
    const user = await Patient.findById(user_id);
    const menu = getMenuFrontEnd(user.rol);

    return resp.status(200).json({
      ok: true,
      message: "This is your new token",
      token,
      user,
      menu,
    });
  }
  const menu = getMenuFrontEnd(user.rol);

  return resp.status(200).json({
    ok: true,
    message: "This is your new token",
    token,
    user,
    menu,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
  loginPatient,
  googleSignInPatient,
};
