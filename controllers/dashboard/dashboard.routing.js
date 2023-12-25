const { getStats } = require("./dashboard.action.js");

module.exports = {
  "/stats": {
    get: {
      action: getStats,
      level: "public",
    },
  },
};
