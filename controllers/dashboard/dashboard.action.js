const db = require("../../models/index");
const ProjectModel = db.projects;
const MDRModel = db.master_document_registers;
const DepartmentModel = db.departments;
const UserModel = db.users;
const SystemLogModel = db.system_logs;
const dayjs = require("dayjs");

module.exports.getStats = async (req, res) => {
  try {
    const employeeCount = await UserModel.count({
      where: {
        companyId: req?.query?.companyId,
        roleId: 2,
      },
    });
    const projectCount = await ProjectModel.count({
      where: {
        companyId: req?.query?.companyId,
      },
    });

    const departmentCount = await DepartmentModel.count({
      where: {
        companyId: req?.query?.companyId,
      },
    });

    const mdrCount = await MDRModel.count({
      where: {
        companyId: req?.query?.companyId,
      },
    });

    const logs = await SystemLogModel.findAll({
      where: { companyId: req?.query?.companyId },
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    const data = [];
    for (const log of logs) {
      data.push({
        id: log?.id,
        title: log?.title,
        createdAt: dayjs(log?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
      });
    }

    return res.status(200).send({
      employeeCount,
      projectCount,
      departmentCount,
      mdrCount,
      logs: data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
