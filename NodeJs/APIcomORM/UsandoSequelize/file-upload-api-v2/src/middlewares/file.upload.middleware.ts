import multer from "multer";
import path from "path";
import util from "util";
import { v4 as uuidv4 } from "uuid";

const maxSize = 1024 * 1024 * 5;

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    const isImage = file.mimetype.includes("image") ? true : false;
    if (isImage) {
      callback(null, path.resolve("src/resources/static/uploads/images"));
      return;
    }
    callback(null, path.resolve("src/resources/static/uploads/files"));
  },
  filename: (request, file, callback) => {
    const [, extension] = file.originalname.split(".");
    file.filename = `${uuidv4()}.${extension}`;
    callback(null, file.filename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

const uploadFileMiddleware = util.promisify(upload);

export default uploadFileMiddleware;
