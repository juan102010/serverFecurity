const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields,validateLog,validateJWT } = require('../middlewares');


const { loginValidation,usersLoginGet,userLoginPut,userLoginPost } = require('../controllers/auth');

const {  emailExists,emailExistsLogin } = require('../helpers/db-validators');

const router = Router();
//metodo get
router.get('/',[
    //Valid that the token that is sent by parameters is correct.
    validateLog,

    validateFields
], usersLoginGet );
//metodo post with login
router.post('/login',[
    //Validate that they are sending the email and password fields to log in.
    check('Ide_Usuario', '00001').isEmail(),
    check('Nom_Dependencia', '00002').not().isEmpty(),
    validateFields
    //in the (loginValidation) part we look at the validations needed to log in.
],loginValidation );
//metodo put
router.put('/',[
    //Valid token 
    validateJWT,
    //validates that the email field has data
    check('Ide_Usuario', '00021').not().isEmpty(),
    //validate that it is an email
    check('Ide_Usuario', '00013').isEmail(),
    //check if the entered id exists
    check('Ide_Usuario').custom( emailExistsLogin ),
    //Valid if the field Nom_Dependency is not empty. 
    check('Nom_Dependencia', '00002').not().isEmpty(),
    validateFields
],userLoginPut );
//metodo post
router.post('/',[
    //validates that the name field has data
    check('Nom_Dependencia', '00002').not().isEmpty(),
    //validate that it is an email
    check('Ide_Usuario', '00013').isEmail(),
    //validates that the email does not exist in the database in order to create it
    check('Ide_Usuario').custom( emailExists ),
    //validates that the Last Update Date field is populated.
    check('Emp_Id', '00022').not().isEmpty(),
    validateFields
], userLoginPost, );


 
module.exports = router;