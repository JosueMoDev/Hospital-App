import {Request, Response, NextFunction} from 'express';
import fs from 'fs-extra';
import jwt from 'jsonwebtoken'

export const isJwtValid = async (req: Request, resp: Response, next: NextFunction) => {
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
    const { user_id }: any = jwt.verify(token, process.env.SECRET_KEY_JWT!);
    req.params.user_id = user_id;
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


