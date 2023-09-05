const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { companyGet, companyPost, companyPut, companyDelete } = require('../controllers/company');

const { notExistIdCompany } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [

], companyGet);
//metodo put
router.put('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Emp_Id', '00023').not().isEmpty(),

    //check if the entered id exists
    check('Emp_Id').custom(notExistIdCompany),
    validateFields
], companyPut);
//metodo post
router.post('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Emp_Nombre', '00023').not().isEmpty(),
    check('Emp_Esquema', '00023').not().isEmpty(),
    check('Emp_Estado', '00023').not().isEmpty(),
    check('Emp_Descripcion', '00023').not().isEmpty(),
    validateFields
], companyPost,);
//metodo delete
router.delete('/:Emp_Id', [
    //Valid token 
    validateJWT,
    //check if the entered id exists
    check('Emp_Id').custom(notExistIdCompany),
], companyDelete,);



module.exports = router;