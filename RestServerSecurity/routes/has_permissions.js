const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { functionalityValidation } = require('../controllers/crud_specific/has_permissions');

const router = Router();
//metodo get
router.get('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Des_DescripcionFuncionalidad', '00023').not().isEmpty(),
    validateFields
], functionalityValidation);


module.exports = router;