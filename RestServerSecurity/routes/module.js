const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateLog, validateJWT } = require('../middlewares');

const { moduleGet, modulePost, modulePut, moduleDelete } = require('../controllers/module');

const { notExistIdModule } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [

], moduleGet);
//metodo put
router.put('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Modulo', '00023').not().isEmpty(),
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Des_DescripcionModulo', '00023').not().isEmpty(),
    //check if the entered id exists
    check('Ide_Modulo').custom(notExistIdModule),
    validateFields
], modulePut);
//metodo post
router.post('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ide_Aplicacion', '00023').not().isEmpty(),
    check('Des_DescripcionModulo', '00023').not().isEmpty(),
    validateFields
], modulePost,);



module.exports = router;