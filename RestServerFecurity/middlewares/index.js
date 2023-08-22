

const validaCampos = require('./validate-fields');
const validarJWT = require('../middlewares/validar-jwt');


module.exports = {
    ...validaCampos,
    ...validarJWT,

}