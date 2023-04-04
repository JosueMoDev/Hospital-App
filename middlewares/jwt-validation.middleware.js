const { response } = require("express");
const fs = require("fs-extra");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isJwtValid = async (req, resp = response, next) => {
  const token = req.header("x-token");
  const file = req.file;
  if (!token) {
    if (file) {
      await fs.unlink(file.path);
    }
    return resp.status(401).json({
      ok: false,
      message: " No token was sent by user",
    });
  }
  try {
    const { user_id } = jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.user_id = user_id;
    next();
  } catch (error) {
    if (file) {
      await fs.unlink(file.path);
    }
    return resp.status(403).json({
      ok: false,
      message: "Invalid token",
    });
  }
};


module.exports = { isJwtValid };
