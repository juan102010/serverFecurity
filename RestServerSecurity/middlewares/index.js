

const validaCampos = require('./validate-fields');
const validateLog = require('./validate_user_login');

module.exports = {
    ...validaCampos,
    ...validateLog
}