const { response } = require('express');

const SBRTCompany = require('../../models/sbrt_Empresa');

//Function to get all companies registered in the database
const companyGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { Emp_Estado: true };

    const [total, company] = await Promise.all([
        SBRTCompany.countDocuments(query),
        SBRTCompany.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        company
    });
}
//Function to create companies in the database
const companyPost = async (req, res = response) => {

    const [company] = await Promise.all([
        SBRTCompany.find()
    ]);
    const orderedResults = company.sort((a, b) => {
        return Number.parseInt(b.Emp_Id) - Number.parseInt(a.Emp_Id)
    })

    const Id = orderedResults[0].Emp_Id;
    const Emp_Id = Id + 1;

    const { Emp_Nombre, Emp_Esquema, Emp_Descripcion, Emp_Estado } = req.body;
    const companyResult = new SBRTCompany({ Emp_Id, Emp_Nombre, Emp_Esquema, Emp_Descripcion, Emp_Estado });

    // Guardar en BD
    await companyResult.save();

    res.json({
        companyResult
    });
}
//creating a method for updating a record
const companyPut = async (req, res = response) => {

    const { Emp_Id, ...resto } = req.body;

    const company = await SBRTCompany.findOneAndUpdate({ Emp_Id: Emp_Id }, resto);

    res.json(company);
}
//logical deletion of a user
const companyDelete = async (req, res = response) => {

    const { Emp_Id } = req.params;
    const company = await SBRTCompany.findOneAndUpdate({ Emp_Id: Emp_Id }, { Emp_Estado: false });

    res.json(company);
}


module.exports = {
    companyGet,
    companyPost,
    companyPut,
    companyDelete
}
