const {
  createUser,
  listUsers,
  checkDuplicateUsernameOrEmail,
  updateUser,
  getUser,
} = require("./users.action");
const { validateToken, authorize } = require("../../helpers/authorize");
module.exports = {
  "/": {
    get: {
      action: [validateToken, listUsers],
      level: "public",
    },
    post: {
      middlewares: checkDuplicateUsernameOrEmail,
      action: [validateToken, createUser],
      level: "public",
    },
    put: {
      action: [validateToken, updateUser],
      level: "public",
    },
  },
  "/:id": {
    get: {
      action: [validateToken, getUser],
      level: "public",
    },
    put: {
      action: [validateToken, updateUser],
      level: "public",
    },
  },
};
