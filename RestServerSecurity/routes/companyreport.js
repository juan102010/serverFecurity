const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields, validateJWT } = require('../middlewares');

const { companyReportGet, companyReportPost, companyReportPut, companyReportDelete } = require('../controllers/crud_basics/companyreport');

const { notExistIdReport } = require('../helpers/db-validators');



const router = Router();
//metodo get
router.get('/', [

], companyReportGet);
//metodo put
router.put('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Ere_Id', '00023').not().isEmpty(),

    //check if the entered id exists
    check('Ere_Id').custom(notExistIdReport),
    validateFields
], companyReportPut);
//metodo post
router.post('/', [
    //Valid token 
    validateJWT,
    //Validations that it is not empty
    check('Emp_Id', '00023').not().isEmpty(),
    check('Ere_NombreReporte', '00023').not().isEmpty(),
    check('Ere_Url_reporte', '00023').not().isEmpty(),
    validateFields
], companyReportPost,);
//metodo delete
router.delete('/:Ere_Id', [
    //Valid token 
    validateJWT,
    //check if the entered id exists
    check('Ere_Id').custom(notExistIdReport),
], companyReportDelete,);



module.exports = router;