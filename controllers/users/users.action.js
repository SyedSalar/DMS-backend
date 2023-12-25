const db = require("../../models/index");
const UserModel = db.users;
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
    const password = generateRandomPassword(10);
    body.password = bcrypt.hashSync(password, 8);
    body.companyId = 1;
    body.roleId = 2;
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
      where: { companyId: req?.query?.companyId, roleId: req?.query?.roleId },
      raw: true,
    });
    const data = [];
    for (const item of users) {
      let roleTitle = "";

      if (item.roleId == 1) roleTitle = "CEO";
      else if (item.roleId == 2) roleTitle = "Employee";
      else roleTitle == "Client";

      data.push({ ...item, roleTitle });
    }
    return res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
};
