import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { JWTGenerated } from "../helpers/JWT.helpers";
import { User } from "../models";

export const getUsers = async (req: Request, resp: Response) => {
  try {
    const pagination = Number(req.query.pagination) || 0;
    const [users, total] = await Promise.all([
      User.find().skip(pagination).limit(5),
      User.countDocuments(),
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
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const createUser = async (req: Request, resp: Response) => {
  const { email, document_number, document_type, email_provider, rol } =
    req.body;
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
        message: `One user has been already enrolled with this document before, ${document_type}:${document_number}`,
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

    return resp.status(200).json({
      ok: true,
      message: "User has been created success",
      user,
      token,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const updateUser = async (req: Request, resp: Response) => {
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
      const isDocumentExistence = await User.findOne({ email });
      if (isDocumentExistence) {
        return resp.status(400).json({
          ok: false,
          message: `There is somebody already enrolled with document:  ${user.document_number}`,
        });
      }
      fields.document_number = document_number;
    }

    const userUpdated = await User.findByIdAndUpdate(id, fields, { new: true });

    return resp.status(200).json({
      ok: true,
      message: `${user.rol} has been updated success`,
      user: userUpdated,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const deleteUser = async (req: Request, resp: Response) => {
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

    if (user_logged?.rol !== "admin") {
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
    const user_updated = await User.findByIdAndUpdate(user_id, user_to_delete, {
      new: true,
    });

    return resp.status(200).json({
      ok: true,
      message: `${user_updated?.rol} has been ${
        user_updated?.validationState ? "Anabled" : "Disabled"
      }`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: false,
      message:
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const confirmPassword = async (req: Request, resp: Response) => {
  const id = req.params.id;
  const oldPassword = req.body.oldPassword;
  try {
    const user = await User.findById(id);
    if (!user) {
      return resp.status(404).json({
        ok: false,
        message: `Unknown user at database`,
      });
    }

    const validatePassword = bcrypt.compareSync(oldPassword, user.password);

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
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};

export const changePassword = async (req: Request, resp: Response) => {
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
        "Unexpected error, email to jonasjosuemoralese@gmail.com to talk it out",
    });
  }
};
