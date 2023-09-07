const { response } = require('express');

const SBRTFunctionalityByRole = require('../../models/sbrt_funcionalidad_por_rol');

//Function to obtain all the functionalities by role recorded in the database
const functionalityByRoleGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;

    const [functionalityByRole] = await Promise.all([
        SBRTFunctionalityByRole.find()
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        functionalityByRole
    });
}
//Function to create the functionality by role in the database
const functionalityByRolePost = async (req, res = response) => {

    const { Ide_Funcionalidad, Ide_Module, Ide_Aplicacion, Ide_Rol } = req.body;
    const functionalityByRoleResponse = new SBRTFunctionalityByRole({ Ide_Funcionalidad, Ide_Module, Ide_Aplicacion, Ide_Rol });

    // Guardar en BD
    await functionalityByRoleResponse.save();

    res.json({
        functionalityByRoleResponse
    });
}
//creating a method for updating a record
const functionalityByRolePut = async (req, res = response) => {

    const { Ide_Funcionalidad, ...resto } = req.body;

    const functionalityByRole = await SBRTFunctionalityByRole.findOneAndUpdate({ Ide_Funcionalidad: Ide_Funcionalidad }, resto);

    res.json(functionalityByRole);
}




module.exports = {
    functionalityByRoleGet,
    functionalityByRolePost,
    functionalityByRolePut
}
