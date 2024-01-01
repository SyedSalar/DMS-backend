const {
  createMDR,
  createDocument,
  listDocuments,
  listMDR,
  createPermission,
  listPermission,
  updateDocumentFormat,
  exportMDRCsv,
} = require("./documents.action");
const { validateToken, authorize } = require("../../helpers/authorize");

const multer = require("multer");
const path = require("path");
const { uid } = require("uid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = file.originalname;
    req.body.fileName = filename;
    cb(null, filename); // File name (timestamp + original extension)
  },
});
const uploadFile = multer({ storage: storage });

module.exports = {
  "/": {
    get: {
      action: [validateToken, listDocuments],
      level: "public",
    },
    post: {
      middlewares: [uploadFile.single("file")],
      action: [validateToken, createDocument],
      level: "public",
    },
  },
  "/mdr": {
    get: {
      action: [validateToken, listMDR],
      level: "public",
    },
    post: {
      action: [validateToken, createMDR],
      level: "public",
    },
  },
  "/permissions": {
    get: {
      action: [validateToken, listPermission],
      level: "public",
    },
    post: {
      action: [validateToken, createPermission],
      level: "public",
    },
  },
  "/format": {
    post: {
      action: [validateToken, updateDocumentFormat],
      level: "public",
    },
  },
  "/export/:id": {
    post: {
      action: [exportMDRCsv],
      level: "public",
    },
  },
};
