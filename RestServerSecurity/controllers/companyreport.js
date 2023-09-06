const { response } = require('express');

const SBRTEmpresaReporte = require('../models/sbrt_empresareportes');

//Function to obtain all the reports of companies registered in the database
const companyReportGet = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { Ere_Estado: true };

    const [total, companyReport] = await Promise.all([
        SBRTEmpresaReporte.countDocuments(query),
        SBRTEmpresaReporte.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        companyReport
    });
}
//Function for creating company reports in the database
const companyReportPost = async (req, res = response) => {

    const [companyReport] = await Promise.all([
        SBRTEmpresaReporte.find()
    ]);
    const orderedResults = companyReport.sort((a, b) => {
        return Number.parseInt(b.Ere_Id) - Number.parseInt(a.Ere_Id)
    })

    const Ere = orderedResults[0].Ere_Id;
    const Ere_Id = Ere + 1;

    const { Emp_Id, Ere_NombreReporte, Ere_Url_reporte, Ere_Estado } = req.body;
    const report = new SBRTEmpresaReporte({ Ere_Id, Emp_Id, Ere_NombreReporte, Ere_Url_reporte, Ere_Estado });

    // Guardar en BD
    await report.save();

    res.json({
        report
    });
}
//creating a method for updating a record
const companyReportPut = async (req, res = response) => {

    const { Ere_Id, ...resto } = req.body;

    const report = await SBRTEmpresaReporte.findOneAndUpdate({ Ere_Id: Ere_Id }, resto);

    res.json(report);
}
//logical deletion of a user
const companyReportDelete = async (req, res = response) => {

    const { Ere_Id } = req.params;
    const report = await SBRTEmpresaReporte.findOneAndUpdate({ Ere_Id: Ere_Id }, { Ere_Estado: false });

    res.json(report);
}


module.exports = {
    companyReportGet,
    companyReportPost,
    companyReportPut,
    companyReportDelete
}
