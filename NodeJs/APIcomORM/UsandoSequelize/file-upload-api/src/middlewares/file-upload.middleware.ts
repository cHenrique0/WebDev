import { Request } from "express";
import multer, { Multer } from "multer";
import util from "util";
import path from "path";
import { __basedir } from "..";

const maxSize: number = 1024 * 1024 * 2;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const PATH = path.join(__basedir + "/resources/static/assets/uploads/");
    callback(null, PATH);
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(upload);

export default uploadFileMiddleware;
