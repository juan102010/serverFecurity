const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateLog, validateJWT } = require('../middlewares');

const { rolByUserGet, rolByUsePost, rolbyuserPut, rolGetByIde } = require('../controllers/rolbyuser');

const { existeRol, notExistemailRolByUser, existsemailRolByUser, emailExistsLogin } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [
    //Valid that the token that is sent by parameters is correct.
    validateLog,
], rolByUserGet);
//metodo get por ide
router.get('/:Ide_Usuario', [

    //check if the entered id exists
    check('Ide_Usuario').custom(notExistemailRolByUser),
    validateFields
], rolGetByIde);
//metodo put
router.put('/:Ide_Usuario', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Rol', '00023').not().isEmpty(),
    check('Ide_Usuario', '00023').not().isEmpty(),
    validateFields

], rolbyuserPut);
//metodo post
router.post('/', [
    //Validations that it is not empty
    check('Ide_Rol', '00023').not().isEmpty(),
    check('Ide_Usuario', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Usuario').custom(emailExistsLogin),
    check('Ide_Usuario').custom(existsemailRolByUser),
    //check if the entered id exists
    check('Ide_Rol').custom(existeRol),
    validateFields,

], rolByUsePost,);




module.exports = router;