import { Router } from 'express';
import { check } from 'express-validator';
import {
    login,
    googleSignIn,
    renewToken,
    googleSignInPatient,
    loginPatient
} from "../controllers";
import { fieldsValidation, isJwtValid } from '../middlewares';

const router = Router();

router.post('/', [
    check('email', 'Email is a required field').not().isEmpty().isEmail(),
    check('password', 'password is a required field').not().isEmpty(),
    fieldsValidation
], login);

router.post('/google', [
    check(`token Token couldn't catch token`).not().isEmpty(),
    fieldsValidation
], googleSignIn);

router.post('/patient', [
    check('email', 'Email is a required field').not().isEmpty().isEmail(),
    check('password', 'password is a required field').not().isEmpty(),
    fieldsValidation
], loginPatient);

router.post('/google/patient', [
    check(`token, 'Token couldn't catch token`).not().isEmpty(),
    fieldsValidation
], googleSignInPatient);

router.get('/renew', isJwtValid, renewToken);

export default router;
