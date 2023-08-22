
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validarJWT,
    tieneRole
} = require('../middlewares');


const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const {userGet,
        userPut,
        userPost,
        userDelete,
        userGetById } = require('../controllers/usuarios');

const router = Router();

//metodo get 
router.get('/', userGet );

//metodo get por id
router.get('/:USU_Id',[
    //verifica si existe el id ingresaso
    check('USU_Id').custom( existeUsuarioPorId ),
    validateFields
], userGetById );

//metodo post
router.post('/',[
    //valida que tenga datos el campo nombre
    check('USU_Nombres', '00011').not().isEmpty(),
    //validad que sea un correo
    check('Ide_Usuario', '00013').isEmail(),
    //valida que el email no exista en la base para poder crearlo
    check('Ide_Usuario').custom( emailExiste ),
    //valida que tenga datos el campo Fecha Ultima Actualizacion
    check('USU_FechaUltimaActualizacion', '00014').not().isEmpty(),
    //valida que tenga datos el campo estado usuario
    check('USU_Activo', '00015').not().isEmpty(),
    validateFields
], userPost, );


router.put('/:USU_Id',[
    //verifica si existe el id ingresaso
    check('USU_Id').custom( existeUsuarioPorId ),
    validateFields
],userPut );


router.delete('/:USU_Id',[
    //valida token 
    //TODO svalidarJWT,
    //verifica si existe el id ingresaso
    check('USU_Id').custom( existeUsuarioPorId ),
    validateFields
],userDelete );






module.exports = router;