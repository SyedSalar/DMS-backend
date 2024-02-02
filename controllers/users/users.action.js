const db = require("../../models/index");
const UserModel = db.users;
const DepartmentModel = db.departments;

const DepartmentUserAssociation = db.department_user_associations;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const {
  generateRandomPassword,
} = require("../../helpers/generate-user-password");
const { sendEmail } = require("../../helpers/send-email");

module.exports.checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  UserModel.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.send({
        message: "Failed! Email already exists!",
      });
      return;
    }
    next();
  });
};

module.exports.createUser = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const password = generateRandomPassword(10);
    body.password = bcrypt.hashSync(password, 8);
   
    const users = await UserModel.create(body);
    body.password = password;
    await sendEmail(body);

    return res.status(200).send({ message: "User has been Created" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const { body } = req;

    const [rowsAffected] = await UserModel.update(body, {
      where: { id: req?.params?.id },
    });
    const token = jwt.sign({ id: req?.params?.id }, config.secret, {
      expiresIn: 1.577e8, // 24 hours
    });

    const user = await UserModel.findOne({
      where: { id: req?.params?.id },
    });

    await SystemLogModel.create({
      title: `${user?.firstName} ${user?.lastName} Record Has Been Updated`,
      companyId: user?.companyId,
    });

    res.status(200).send({
      user,
      accessToken: token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
module.exports.getUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      where: { id: req?.params?.id },
    });

    return res.status(200).send(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};

module.exports.listUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      where: { companyId: req?.query?.companyId },
      raw: true,
    });
   
    const data = [];
    for (const item of users) {
      console.log(item.id);
      let roleTitle = "";
      
      const department = await DepartmentUserAssociation.findOne({
        where: { userId: item.id },
        raw: true,
      });
      console.log(department);

      if (item.roleId == 1) roleTitle = "CEO";
      else if (item.roleId == 2) roleTitle = "Head";
      else if (item.roleId == 3) roleTitle = "Senior";
      else if (item.roleId == 4) roleTitle = "Junior";
      else if (item.roleId == 5) roleTitle = "Designer";

      else roleTitle == "Client";
      if(department!== null){
      
        console.log('hi');
        userDepartmentId=department.departmentId;
        var departmentName = await DepartmentModel.findOne({
          where: { id: userDepartmentId },
          raw: true,
        });
        departmentName=departmentName.title;
        data.push({ ...item, roleTitle,departmentName });
      }
      else{
      data.push({ ...item, roleTitle });}
    }
    console.log('mydata',data);
    return res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
