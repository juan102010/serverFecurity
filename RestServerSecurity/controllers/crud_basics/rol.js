const { response } = require('express');

const SBRTRol = require('../../models/sbrt_rol');

//Function to obtain all the roles registered in the database.
const rolGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { Est_Habilitado: true };

    const [total, rol] = await Promise.all([
        SBRTRol.countDocuments(query),
        SBRTRol.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        rol
    });
}
//Function to create roles in the database
const rolPost = async (req, res = response) => {

    const [rol] = await Promise.all([
        SBRTRol.find()
    ]);
    const orderedResults = rol.sort((a, b) => {
        return Number.parseInt(b.Ide_Rol) - Number.parseInt(a.Ide_Rol)
    })


    const Ide = orderedResults[0].Ide_Rol;
    const Ide_Rol = Ide + 1;

    const { Des_DescripcionRol, Est_Habilitado, Emp_Id } = req.body;
    const role = new SBRTRol({ Ide_Rol, Des_DescripcionRol, Est_Habilitado, Emp_Id });



    // Guardar en BD
    await role.save();

    res.json({
        role
    });
}
//creating a method for updating a record
const rolPut = async (req, res = response) => {


    const { Ide_Rol, ...resto } = req.body;

    const rol = await SBRTRol.findOneAndUpdate({ Ide_Rol: Ide_Rol }, resto);

    res.json(rol);
}
//logical deletion of a user
const rolDelete = async (req, res = response) => {

    const { Ide_Rol } = req.params;
    const rol = await SBRTRol.findOneAndUpdate({ Ide_Rol: Ide_Rol }, { Est_Habilitado: false });

    res.json(rol);
}


module.exports = {
    rolGet,
    rolPost,
    rolPut,
    rolDelete
}
