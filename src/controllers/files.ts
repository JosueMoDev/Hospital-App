import { Request, Response } from "express";
import fs from "fs-extra";
import { handlerPhoto, handlerFolder } from "../helpers";

export const uploadPhoto = async (req: Request, resp: Response) => {
  const folder = req.params.folder as string;
  const id = req.params.id as string;
  const file = req.file as Express.Multer.File;

  try {
    if (!file) {
      await fs.unlink(file.path);
      return resp.status(400).json({
        ok: false,
        message: `You didn't provide any photo or the file extension is forbidden`,
      });
    }

    const isPathAvailable = ["users", "patients", "clinics"];
    if (!isPathAvailable.includes(folder)) {
      await fs.unlink(file.path);
      return resp.status(403).json({
        ok: false,
        message: "Path not found",
      });
    }

    const schema = await handlerFolder(folder, id);

    if (schema) {
      const cloudinary_response = await handlerPhoto.uploadPhoto(schema, file.path);
      await fs.unlink(file.path);
      if (cloudinary_response) {
        return resp.status(200).json({
          ok: true,
          photo: schema.document.photo,
          message: "Photo upload success",
        });
      } else {
        return resp.status(404).json({
          ok: false,
          message: `We couldn't upload the photo`,
        });
      }
    } else {
      await fs.unlink(file.path);
      return resp.status(404).json({
        ok: false,
        message: `We couldn't find any document in ${schema?.document.rol + "s"} in the database`,
      });
    }
  } catch (error) {
    await fs.unlink(file.path);
    return resp.status(500).json({
      ok: false,
      message: `Unexpected error, email to jonasjosuemoralese@gmail.com to discuss it`,
      error,
    });
  }
};

export const deletePhoto = async (req: Request, resp: Response) => {
  const folder = req.params.folder as string;
  const id = req.params.id as string;

  try {
    const schema = await handlerFolder(folder, id);

    if (schema) {
      const cloudinary_response = await handlerPhoto.destroyPhoto(schema);
      if (cloudinary_response) {
        return resp.status(200).json({
          ok: true,
          photo: "",
          message: "Photo delete success",
        });
      } else {
        return resp.status(404).json({
          ok: false,
          message: `We couldn't find any photo`,
        });
      }
    }
    return resp.status(404).json({
      ok: false,
      message: `We couldn't find any document in ${folder} in the database`,
    });
  } catch (error) {
    return resp.status(500).json({
      ok: true,
      message: `Something went wrong, we couldn't delete the photo`,
    });
  }
};
