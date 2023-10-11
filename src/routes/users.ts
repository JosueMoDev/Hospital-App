
import { Router } from 'express';
import { check } from 'express-validator';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  confirmPassword,
  changePassword
} from "../controllers";
import { fieldsValidation } from "../middlewares";
import { isJwtValid } from "../middlewares";

const router = Router();

router.get("/", isJwtValid, getUsers);

router.post("/",[
    isJwtValid,
    check("document_type", "document type is a required field").not().isEmpty(),
    check("document_number", "document number is a required field").not().isEmpty(),
    check("email", "email is a required field").isEmail(),
    check("name", "user name is a required field").not().isEmpty(),
    check("lastname", "user lastname is a required field").not().isEmpty(),
    check("gender", "gender is a required field").not().isEmpty(),
    check("phone", "Phone is a required field").not().isEmpty(),
    check("rol", "rol is a required field").not().isEmpty(),
    fieldsValidation,
], createUser);

router.put("/:id", [isJwtValid,
    check("document_type", "document type is a required field").not().isEmpty(),
    check("document_number", "document number is a required field").not().isEmpty(),
    check("email", "email is a required field").isEmail(),
    check("name", "user name is a required field").not().isEmpty(),
    check("lastname", "user lastname is a required field").not().isEmpty(),
    check("gender", "gender is a required field").not().isEmpty(),
    check("phone", "Phone is a required field").not().isEmpty(),
    fieldsValidation,
], updateUser);
  
router.put("/delete/:id", [isJwtValid], deleteUser);

router.post("/confirm-password/:id", [
    isJwtValid,
    check("oldPassword", "Old password is a required field").not().isEmpty(),
], confirmPassword);
  
router.put("/change-password/:id",[
    isJwtValid,
    check("newPassword", "New password is a required field").not().isEmpty(),
], changePassword);

export default router;
