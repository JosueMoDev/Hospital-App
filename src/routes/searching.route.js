const { Router } = require('express');
const { clinicBrowser } = require('../controllers/clinic-browser.controller');
const { isJwtValid } = require('../middlewares/jwt-validation.middleware');
const router = Router();
router.get('/:query', isJwtValid, clinicBrowser);
module.exports = router;