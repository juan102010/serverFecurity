const { Router } = require('express');
const { check } = require('express-validator');


const { validateFields } = require('../middlewares/validate-fields');


const { loginValidation } = require('../controllers/auth');


const router = Router();

router.post('/login',[
    //validamos que estan enviado los campos de correo y password para ingresar
    check('Ide_Usuario', '00001').isEmail(),
    check('Nom_Dependencia', '00002').not().isEmpty(),
    validateFields
    //en la parte de (loginValidation) miramos las validacion necesarias para ingresar
],loginValidation );



module.exports = router;