const { Router } = require('express');
const { check } = require('express-validator');
const { InputValidator } = require('../middlewares/input-validator');
const { getSearchAll, getDocumentsByCollection } = require('../controllers/searchs');
const { validateJWT } = require('../middlewares/validate-jwt');

/**
 * Path: /api/searchs
 */
const router = Router();

router.get('/all/:criteria', validateJWT, getSearchAll);
router.get('/collection/:table/:criteria', validateJWT, getDocumentsByCollection);


module.exports = router;