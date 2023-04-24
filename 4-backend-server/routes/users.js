const { Router } = require('express');
const { check } = require('express-validator');
const { InputValidator } = require('../middlewares/input-validator');
const { getUsers, createUsers, updateUsers, deleteUsers } = require('../controllers/users');
const { validateJWT } = require('../middlewares/validate-jwt');

/**
 * Path: /api/users
 */
const router = Router();

router.get('/', validateJWT, getUsers);

// el middleware se manda como segundo argumento, si son varios se define como un array[]
// check('atributo-map', 'custom msn for validation')
router.post('/', [
    validateJWT,
    check('name', 'name is required').notEmpty(),
    check('password', 'password is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    InputValidator,
], createUsers);

router.put('/:id', [
    validateJWT,
    check('name', 'name is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').notEmpty(),
    InputValidator,
], updateUsers);

router.delete('/:id', validateJWT, deleteUsers)

module.exports = router;