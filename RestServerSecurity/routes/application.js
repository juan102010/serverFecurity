const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { applicationGet, applicationPost, applicationPut, applicationDelete } = require('../controllers/application');

const { notExistIdApplication } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [

], applicationGet);
//metodo put
router.put('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Des_DescripcionAplicacion', '00023').not().isEmpty(),
    check('Est_Habilitado', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Aplicacion').custom(notExistIdApplication),
    validateFields
], applicationPut);
//metodo post
router.post('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Des_DescripcionAplicacion', '00023').not().isEmpty(),
    check('Est_Habilitado', '00023').not().isEmpty(),
    validateFields
], applicationPost,);
//metodo delete
router.delete('/:Ide_Aplicacion', [
    //Valid token 
    validateJWT,
    //check if the entered id exists
    check('Ide_Aplicacion').custom(notExistIdApplication),
], applicationDelete,);



module.exports = router;