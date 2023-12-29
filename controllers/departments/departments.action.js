const db = require("../../models/index");
const DepartmentModel = db.departments;
const SystemLogModel = db.system_logs;
module.exports.createDepartment = async (req, res) => {
  try {
    await DepartmentModel.create(req?.body);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
    });
    return res.status(200).send({ message: "Departments Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listDepartments = async (req, res) => {
  try {
    const departments = await DepartmentModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(departments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
