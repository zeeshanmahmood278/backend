import multer from "multer";
import multerConfig from "../config/multerConfig.mjs";

const inputfieldName = "images";
const { storage, fileFilter } = multerConfig;

export default multer({
  storage: storage,
  fileFilter: fileFilter,
}).array(inputfieldName, 6);
