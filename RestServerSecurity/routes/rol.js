const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateLog, validateJWT } = require('../middlewares');

const { rolGet, rolPost, rolPut, rolDelete } = require('../controllers/rol');

const { existeRol } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [
    //Valid that the token that is sent by parameters is correct.
    validateLog,
], rolGet);
//metodo put
router.put('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Rol', '00023').not().isEmpty(),
    check('Des_DescripcionRol', '00023').not().isEmpty(),
    check('Emp_Id', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Rol').custom(existeRol),
    validateFields
], rolPut);
//metodo post
router.post('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Des_DescripcionRol', '00023').not().isEmpty(),
    check('Emp_Id', '00023').not().isEmpty(),
    validateFields
], rolPost,);
//metodo delete
router.delete('/:Ide_Rol', [
    //Valid token 
    validateJWT,
    //check if the entered id exists
    check('Ide_Rol').custom(existeRol),
], rolDelete,);



module.exports = router;