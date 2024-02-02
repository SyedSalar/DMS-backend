const db = require("../../models/index");
const ProjectModel = db.projects;
const SystemLogModel = db.system_logs;
const DepartmentModel = db.departments
module.exports.createProject = async (req, res) => {
  try {
    if(Array.isArray(req.body.departmentId)){
      console.log(req.body.departmentId.length);
      var deptArray=req.body.departmentId;
     for (let index = 0; index < deptArray.length; index++) {

      let element = deptArray[index];
      console.log(element)
      req.body.departmentId=element
      console.log(req.body.title);
      console.log('check change',req.body);
      await ProjectModel.create(req?.body);
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        title: `${req?.body?.authorName} Created Project ${req?.body?.title}`,
      });
    } }
    else {
      const project = await ProjectModel.create(req?.body);
      await SystemLogModel.create({
        title: `${req?.body?.authorName} Created Project ${req?.body?.title}`,
        companyId: req?.body?.companyId,
      });
    }
    return res.status(200).send({ message: "Projects Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.createDepartment = async (req, res) => {
  try {
    console.log('dept body',req.body);
    console.log(req.body.title);
    
    if(Array.isArray(req.body.title)){
      console.log(req.body.title.length);
      var deptArray=req.body.title;
     for (let index = 0; index < deptArray.length; index++) {

      let element = deptArray[index];
      console.log(element)
      req.body.title=element
      console.log(req.body.title);
      console.log('check change',req.body);
      await DepartmentModel.create(req?.body);
      await SystemLogModel.create({
        companyId: req?.body?.companyId,
        title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
      });
    } }
    else{
    await DepartmentModel.create(req?.body);
    await SystemLogModel.create({
      companyId: req?.body?.companyId,
      title: `${req?.body?.authorName} Created Department ${req?.body?.title}`,
    });
  }
    return res.status(200).send({ message: "Departments Created" });
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
    const departmentIds = projects.map(project => project.dataValues.departmentId);

console.log(departmentIds);
const departments = await DepartmentModel.findAll({
  where: {
    id: departmentIds
  }
});
const departmentNames = departments.map(department => (department.dataValues.id,department.dataValues.title));
const departmentMap = {};
departments.forEach(department => {
  departmentMap[department.dataValues.id] = department.dataValues.title;
});
console.log(departmentMap);
console.log(departmentNames);
const combinedData = projects.map(project => {
  const departmentName = departmentMap[project.dataValues.departmentId];
  return {
    ...project.dataValues,
    departmentName: departmentName || 'Unknown' // Handle cases where departmentName is not found
  };
});

console.log(combinedData);
    return res.status(200).send(combinedData);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
