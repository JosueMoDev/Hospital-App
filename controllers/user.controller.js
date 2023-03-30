const User = require("../models/user.model");
const Clinic = require("../models/clinic.model");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { JWTGenerated } = require("../helpers/JWT.helpers");

const getUsers = async (req, resp = response) => {
  try {
    const pagination = Number(req.query.pagination) || 0;
    const [users, total] = await Promise.all([
      User.find().skip(pagination).limit(5),
      User.count(),
    ]);

    return resp.status(200).json({
      ok: true,
      message: "Getting Users ....",
      users,
      total,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const createUser = async (req, resp) => {
  const { email, document_number, document_type, email_provider, rol } = req.body;
  try {
    const isPathAvailable = ["doctor", "operator"];

    if (!isPathAvailable.includes(rol)) {
      return resp.status(403).json({
        ok: false,
        message: "Forbidden action",
      });
    }
    const isEmailTaken = await User.findOne({ email });
    if (isEmailTaken) {
      return resp.status(400).json({
        ok: false,
        message: "This mail  has been already taken",
      });
    }

    const isPreviuslyRegister = await User.findOne({ document_number });
    if (isPreviuslyRegister) {
      return resp.status(400).json({
        ok: false,
        message: `One user has been already enrrolled with this document before, ${document_type}:${document_number}`,
      });
    }
    const user = new User(req.body);

    user.email_provider = email_provider;
    const password = "the clinic";
    const encrypting = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, encrypting);
    user.photo = "";

    await user.save();

    const token = await JWTGenerated(user.id);

    return resp.json({
      ok: true,
      message: "User has been created success",
      user,
      token,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const updateUser = async (req, resp) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return resp.status(404).json({
        ok: false,
        message: "unknown user at database",
      });
    }

    const { email, document_number, ...fields } = req.body;

    if (user.email !== email) {
      const isEmailTaken = await User.findOne({ email });
      if (isEmailTaken) {
        return resp.status(400).json({
          ok: false,
          message: "This mail has been already taken",
        });
      }
      fields.email = email;
    }
    if (user.document_number !== document_number) {
      const isDocumentExitent = await User.findOne({ email });
      if (isDocumentExitent) {
        return resp.status(400).json({
          ok: false,
          message: `There is somebody already enrrolled with document:  ${user.document_number}`,
        });
      }
      fields.document_number = document_number;
    }

    const userUpdated = await User.findByIdAndUpdate(id, fields, { new: true });

    return resp.status(200).json({
      ok: true,
      message: ` ${user.rol} has been updated success`,
      user: userUpdated,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const deleteUser = async (req, resp) => {
  const user_id = req.params.id;
  const user_logged_id = req.body.user_logged;
  try {
    const user_to_delete = await User.findById(user_id);
    const user_logged = await User.findById(user_logged_id);

    if (!user_to_delete) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown user at database`,
      });
    }

    if (user_logged.rol !== "admin") {
      return resp.status(404).json({
        ok: false,
        message: `Forbidden action`,
      });
    }
    if (user_to_delete.rol === "admin") {
      return resp.status(404).json({
        ok: false,
        message: `Forbidden action`,
      });
    }
    if (user_logged.id === user_to_delete.id) {
      return resp.status(404).json({
        ok: false,
        message: `Forbidden action`,
      });
    }

    user_to_delete.validationState = !user_to_delete.validationState;
    const user_updated = await User.findByIdAndUpdate(user_id, user_to_delete, {new: true});

    return resp.status(200).json({
      ok: true,
      message: `${user_updated.rol} has been ${user_updated.validationState ? "Anabled" : "Disabled"}`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const confirmatePassword = async (req, resp) => {
  const id = req.params.id;
  const oldPassoword = req.body.oldPassword;
  try {
    const user = await User.findById(id);
    if (!user) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown user at database`,
      });
    }

    const validatePassword = bcrypt.compareSync(oldPassoword, user.password);

    if (!validatePassword) {
      return resp.status(400).json({
        ok: false,
        message: "Incorrect Password",
      });
    }

    return resp.status(200).json({
      ok: true,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

const changePassword = async (req, resp) => {
  const id = req.params.id;
  const newPassword = req.body.newPassword;
  try {
    const user = await User.findById(id);
    if (!user) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown user at database`,
      });
    }

    const encrypting = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(newPassword, encrypting);
    await User.findByIdAndUpdate(id, user, { new: true });
    return resp.status(200).json({
      ok: true,
      message: "Password has been changed success",
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, mail to jonasjosuemoralese@gmail.com to talk out it",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  confirmatePassword,
  changePassword
};
