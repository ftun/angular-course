const { Router } = require('express');
const { check } = require('express-validator');
const { InputValidator } = require('../middlewares/input-validator');
const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitals');
const { validateJWT } = require('../middlewares/validate-jwt');

/**
 * Path: /api/hospitals
 */
const router = Router();

router.get('/', validateJWT, getHospitals);

// el middleware se manda como segundo argumento, si son varios se define como un array[]
// check('atributo-map', 'custom msn for validation')
router.post('/', [
    validateJWT,
    check('name', 'name is required').notEmpty(),
    InputValidator,
], createHospitals);

router.put('/:id', [
    validateJWT,
    check('name', 'name is required').notEmpty(),
    // check('email', 'email is required').isEmail(),
    // check('role', 'role is required').notEmpty(),
    InputValidator,
], updateHospitals);

router.delete('/:id', validateJWT, deleteHospitals)

module.exports = router;