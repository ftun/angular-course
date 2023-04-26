const { Router } = require('express');
const { check } = require('express-validator');
// const { InputValidator } = require('../middlewares/input-validator');
const { uploadFile, getFiles } = require('../controllers/uploads');
const { validateJWT } = require('../middlewares/validate-jwt');

const expressFileUpload = require('express-fileupload');

/**
 * Path: /api/uploads
 */
const router = Router();
router.use(expressFileUpload());


router.put('/:collection/:id', validateJWT, uploadFile);
router.get('/:collection/:id', validateJWT, getFiles);



module.exports = router;