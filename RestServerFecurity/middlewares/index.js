

const validaCampos = require('./validate-fields');
const validateJWT = require('./validate-jwt');


module.exports = {
    ...validaCampos,
    ...validateJWT,

}