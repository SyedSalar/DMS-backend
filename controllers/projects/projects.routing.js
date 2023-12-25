const { createProject, listProjects } = require("./projects.action");
const { validateToken, authorize } = require("../../helpers/authorize");
module.exports = {
  "/": {
    get: {
      action: [validateToken, listProjects],
      level: "public",
    },
    post: {
      action: [validateToken, createProject],
      level: "public",
    },
  },
};
