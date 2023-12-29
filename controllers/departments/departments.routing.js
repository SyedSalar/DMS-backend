const { listDepartments, createDepartment } = require("./departments.action");
const { validateToken, authorize } = require("../../helpers/authorize");

module.exports = {
  "/": {
    get: {
      action: [validateToken, listDepartments],
      level: "public",
    },
    post: {
      action: [validateToken, createDepartment],
      level: "public",
    },
  },
};
