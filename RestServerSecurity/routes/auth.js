const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validate-fields');


const { loginValidation } = require('../controllers/auth');


const router = Router();

router.post('/login',[
    //Validate that they are sending the email and password fields to log in.
    check('Ide_Usuario', '00001').isEmail(),
    check('Nom_Dependencia', '00002').not().isEmpty(),
    validateFields
    //in the (loginValidation) part we look at the validations needed to log in.
],loginValidation );



module.exports = router;