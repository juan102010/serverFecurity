const { response } = require('express');

const SBRTRol = require('../models/sbrt_rol');


const rolGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { Est_Habilitado: true };

    const [ total, rol ] = await Promise.all([
        SBRTRol.countDocuments(query),
        SBRTRol.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        rol
    });
}

const rolPost = async (req, res = response) => {
 
    const  [rol]  = await Promise.all([
        SBRTRol.find()
    ]);
    const resultadosOrdenados = rol.sort((a,b) =>{
        return Number.parseInt(b.Ide_Rol) - Number.parseInt(a.Ide_Rol)
      })
    
   
     const Ide=resultadosOrdenados[0].Ide_Rol;
     const Ide_Rol=Ide+1;

     const {  Des_DescripcionRol, Est_Habilitado,Emp_Id } = req.body;
     const role = new SBRTRol({Ide_Rol,Des_DescripcionRol, Est_Habilitado,Emp_Id});

    

    // Guardar en BD
    await role.save();

    res.json({
        role
    });
}



module.exports = {
    rolGet,
    rolPost
}
