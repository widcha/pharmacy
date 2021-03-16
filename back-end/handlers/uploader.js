const multer = require("multer");
const fs = require("fs");

const uploader = (destination, fileNamePrefix) => {
  let defaultPath = "./public";

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = defaultPath + destination;
      if (fs.existsSync(dir)) {
        console.log(dir, "directory exists");
        cb(null, dir);
      } else {
        fs.mkdir(dir, { recursive: true }, (err) => cb(err, dir));
      }
    },
    filename: (req, file, cb) => {
      let originalname = file.originalname;
      let ext = originalname.split(".");
      let filename = fileNamePrefix + Date.now() + "." + ext[ext.length - 1];
      cb(null, filename);
    },
  });

  const fileFilter = (req, file, cb) => {
    const ext = /\.(jpg|jpeg|png|gif|pdf|doc|docx|xlsx)$/;
    if (!file.originalname.toLowerCase().match(ext)) {
      return cb(new Error("Only Selected file types are allowed"), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    fileFilter,
  });
};

module.exports = uploader;