const db = require("../../models/index");
const ProjectModel = db.projects;
const SystemLogModel = db.system_logs;
module.exports.createProject = async (req, res) => {
  try {
    const project = await ProjectModel.create(req?.body);
    await SystemLogModel.create({
      title: `${req?.body?.authorName} Created Project ${req?.body?.title}`,
      companyId: req?.body?.companyId,
    });
    return res.status(200).send({ message: "Projects Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.findAll({
      where: { companyId: req?.query?.companyId },
    });
    return res.status(200).send(projects);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
