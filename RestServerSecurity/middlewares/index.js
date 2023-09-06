

const validaCampos = require('./validate-fields');
const validateLog = require('./validate_user_login');
const validateJWT = require('./validate-jwt');

module.exports = {
    ...validaCampos,
    ...validateLog,
    ...validateJWT
}