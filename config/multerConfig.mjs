import multer from "multer";
import path from "path";



const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isTypeImage = file.mimetype.startsWith("image/");
  if (!isTypeImage) {
    return cb(new Error("Only image files are allowed"), false);
  }
  cb(null, true);
};

export default {
  storage,
  fileFilter,
};



// /* DIRECTORY NAME */
// const uploadIn = "uploads/";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadIn);
//   },
//   filename: (req, file, cb) => {
//     const uniqueFileName = Date.now() + path.extname(file.originalname);
//     /* ATTACHING GENERATING FILE NAME WITH REQ */
//     req.uniqueFileName = uniqueFileName;
//     cb(null, uniqueFileName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const isTypeImage = file.mimetype.startsWith("image/");
//   if (!isTypeImage) {
//     cb(new Error("Only images accepted"), false);
//   }
//   cb(null, true);
// };

// export default {
//   storage,
//   fileFilter,
// };
