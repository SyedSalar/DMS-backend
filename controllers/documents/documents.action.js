const db = require("../../models/index");
const DocumentModel = db.documents;
const DepartmentModel = db.departments;
const ProjectModel = db.projects;

const MDRModel = db.master_document_registers;
const DocumentPermssionModel = db.user_document_permissions;
const SystemLogModel = db.system_logs;
const CompanyModel = db.company;
const { createPDF } = require("../../helpers/create-pdf");
const { createWordFile } = require("../../helpers/create-docx");
const path = require("path");
const { omit } = require("lodash");

const fs = require("fs");
const Papa = require("papaparse");

module.exports.listDocuments = async (req, res) => {
  try {
    const documents = await DocumentModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(documents);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.listMDR = async (req, res) => {
  try {
    const mdr = await MDRModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(mdr);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.createMDR = async (req, res) => {
  try {
    const mdr = await MDRModel.create(req?.body);
    await SystemLogModel.create({
      title: `${req?.body?.authorName} Created MDR ${req?.body?.title}`,
      companyId: req?.body?.companyId,
    });
    return res
      .status(200)
      .send({ message: "Master Document Register Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.createDocument = async (req, res) => {
  try {
    if (req?.body?.roleId != 1) {
      const permissionExist = await DocumentPermssionModel.findOne({
        where: {
          masterDocumentId: req?.body?.masterDocumentId,
          userId: req?.body?.userId,
          companyId: req?.body?.companyId,
          createDocument: 1,
        },
      });
      if (!permissionExist) {
        return res.status(403).send({ message: "Permission denied" });
      }
    }
    const log = `${req?.body?.userName} Created Document ${req?.body?.title}`;
    const body = omit(req.body, ["roleId", "userId", "userName"]);
    const document = await DocumentModel.create(body);
    await SystemLogModel.create({
      title: log,
      companyId: req?.body?.companyId,
    });
    const filePath = path.join(
      __dirname,
      "..",
      "..",
      "uploads",
      `${req?.body?.title}${req?.body?.extension}`
    );
    if (req?.body?.extension == ".pdf") {
      await createPDF(req?.body?.content, filePath);
    }
    if (req?.body?.extension == ".docx") {
      await createWordFile(req?.body?.content, filePath);
    }
    return res.status(200).send({ message: "Document Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.createPermission = async (req, res) => {
  try {
    if (req?.body?.createDocument) req.body.reviewDocument = 1;
    await DocumentPermssionModel.create(req?.body);
    return res.status(200).send({ message: "Document Permission Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listPermission = async (req, res) => {
  try {
    const data = await DocumentPermssionModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    const resData = [];
    for (const item of data) {
      resData.push({
        id: item?.id,
        userId: item?.userId,
        masterDocumentId: item?.masterDocumentId,
        allowReview: item?.reviewDocument ? "Yes" : "No",
        allowApprove: item?.approveDocument ? "Yes" : "No",
        allowCreate: item?.createDocument ? "Yes" : "No",
      });
    }
    return res.status(200).send(resData);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateDocumentFormat = async (req, res) => {
  try {
    const { body } = req;

    const [rowsAffected] = await CompanyModel.update(body, {
      where: { id: req?.query?.companyId },
    });
    res.status(200).send({ message: "Document Format Updated" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.getCodes = async (req, res) => {
  try {
    const company= await CompanyModel.findOne({
      where:{ id: req?.query?.companyId },
    })
    const DepartmentCode = await DepartmentModel.findAll({
      where:{ companyId: req?.query?.companyId },
    })
    const ProjectCode = await ProjectModel.findAll({
      where:{ companyId: req?.query?.companyId },
    })

    if (company) {
      const { documentNumberFormat } = company.dataValues;
      res.status(200).send({ documentNumberFormat });
    }     
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};


module.exports.exportMDRCsv = async (req, res) => {
  try {
    const company = await CompanyModel.findOne({
      where: { id: req?.query?.companyId },
    });
    const data = await MDRModel.findOne({
      where: { id: req?.params?.id },
      raw: true,
    });

    const format = company?.documentNumberFormat;
    const orderedProperties = format.split("-");
    const noOfDocuments = data?.noOfDocuments;

    const outputDocuments = [];
    for (i = 1; i <= noOfDocuments; i = i + 1) {
      let formatedName = "";
      for (const [index, item] of orderedProperties?.entries()) {
        console.log(item);
        if (item == "docNumber") {
          formatedName += i;
        } else {
          formatedName += data[item];
        }

        if (index + 1 != orderedProperties?.length) {
          formatedName += "-";
        }
      }
      outputDocuments.push(formatedName);
    }

    // Convert array to CSV
    const csv = Papa.unparse(outputDocuments.map((item) => [item]));

    // Write CSV content to a file
    fs.writeFileSync(
      `${data?.departmentName}-${data?.projectCode}-${data?.mdrCode}.csv`,
      csv,
      "utf-8"
    );

    console.log(outputDocuments, data, data["mdrCode"], csv);

    res.status(200).send({
      message: `CSV Exported as ${data?.departmentName}-${data?.projectCode}-${data?.mdrCode}`,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
