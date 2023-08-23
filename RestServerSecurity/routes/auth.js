const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields,validateLog,validateJWT } = require('../middlewares');


const { loginValidation,usersLoginGet,userLoginPut } = require('../controllers/auth');

const {  emailExists } = require('../helpers/db-validators');

const router = Router();

router.get('/',[
    //Valid that the token that is sent by parameters is correct.
    validateLog,

    validateFields
], usersLoginGet );
router.post('/login',[
    //Validate that they are sending the email and password fields to log in.
    check('Ide_Usuario', '00001').isEmail(),
    check('Nom_Dependencia', '00002').not().isEmpty(),
    validateFields
    //in the (loginValidation) part we look at the validations needed to log in.
],loginValidation );
router.put('/',[
    //Valid token 
    validateJWT,
    //validates that the email field has data
    check('Ide_Usuario', '00021').not().isEmpty(),
    //validate that it is an email
    check('Ide_Usuario', '00013').isEmail(),
    //check if the entered id exists
    check('Ide_Usuario').custom( emailExists ),
    //Valid if the field Nom_Dependency is not empty. 
    check('Nom_Dependencia', '00002').not().isEmpty(),
    validateFields
],userLoginPut );



 
module.exports = router;