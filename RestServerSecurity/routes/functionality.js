const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateLog, validateJWT } = require('../middlewares');

const { functionalityGet, functionalityPost, functionalityPut } = require('../controllers/crud_basics/functionality');

const { notExistIdfunctionality, notExistIdModule, notExistIdApplication } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [

], functionalityGet);
//metodo put
router.put('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Funcionalidad', '00023').not().isEmpty(),
    check('Ide_Modulo', '00023').not().isEmpty(),
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Des_DescripcionFuncionalidad', '00023').not().isEmpty(),
    check('Descripcion', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Funcionalidad').custom(notExistIdfunctionality),
    validateFields
], functionalityPut);
//metodo post
router.post('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Modulo', '00023').not().isEmpty(),
    check('Ide_Modulo').custom(notExistIdModule),
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Ide_Aplicacion').custom(notExistIdApplication),
    check('Des_DescripcionFuncionalidad', '00023').not().isEmpty(),
    check('Descripcion', '00023').not().isEmpty(),
    validateFields
], functionalityPost,);




module.exports = router;