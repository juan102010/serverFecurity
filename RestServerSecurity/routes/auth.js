const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields,validateLog } = require('../middlewares');


const { loginValidation,usersLoginGet } = require('../controllers/auth');


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



 
module.exports = router;