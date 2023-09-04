const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields,validateJWT } = require('../middlewares');

const { functionalityByRoleGet,functionalityByRolePost,functionalityByRolePut } = require('../controllers/functionality_by_role');

const {  notExistIdfunctionalityByRole,notExistIdModule,notExistIdApplication,existeRol } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/',[
    
], functionalityByRoleGet );
//metodo put
router.put('/',[
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Funcionalidad', '00023').not().isEmpty(),
    check('Ide_Module', '00023').not().isEmpty(),
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Ide_Rol', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Funcionalidad').custom( notExistIdfunctionalityByRole ),
    check('Ide_Module').custom( notExistIdModule ),
    check('Ide_Aplicacion').custom( notExistIdApplication ),
    check('Ide_Rol').custom( existeRol ),
    validateFields
],functionalityByRolePut );
//metodo post
router.post('/',[
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Funcionalidad', '00023').not().isEmpty(),
    check('Ide_Module', '00023').not().isEmpty(),
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Ide_Rol', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Funcionalidad').custom( notExistIdfunctionalityByRole ),
    check('Ide_Module').custom( notExistIdModule ),
    check('Ide_Aplicacion').custom( notExistIdApplication ),
    check('Ide_Rol').custom( existeRol ),
    validateFields
], functionalityByRolePost, );



 
module.exports = router;