
const { Router } = require('express');
const { check } = require('express-validator');

const {
    validateFields,
    validateJWT
} = require('../middlewares');


const {  emailExists, existsUserById } = require('../helpers/db-validators');

const {userGet,
        userPut,
        userPost,
        userDelete,
        userGetById } = require('../controllers/users_controllers');

const router = Router();

//metodo get 
router.get('/', userGet );

//metodo get por id
router.get('/:USU_Id',[
    //check if the entered id exists
    check('USU_Id').custom( existsUserById ),
    validateFields
], userGetById );

//metodo post
router.post('/',[
    //validates that the name field has data
    check('USU_Nombres', '00011').not().isEmpty(),
    //validate that it is an email
    check('Ide_Usuario', '00013').isEmail(),
    //validates that the email does not exist in the database in order to create it
    check('Ide_Usuario').custom( emailExists ),
    //validates that the Last Update Date field is populated.
    check('USU_FechaUltimaActualizacion', '00014').not().isEmpty(),
    //validates that the user status field has data
    check('USU_Activo', '00015').not().isEmpty(),
    validateFields
], userPost, );


router.put('/:USU_Id',[
    //check if the entered id exists
    check('USU_Id').custom( existsUserById ),
    validateFields
],userPut );


router.delete('/:USU_Id',[
    //Valid token  
    validateJWT,
    //check if the entered id exists
    check('USU_Id').custom( existsUserById ),
    validateFields
],userDelete );


module.exports = router;