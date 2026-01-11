import multer from "multer";
import multerConfig from "../init/multerInit.mjs";

const multerMiddleware = (req, res, next) => {
  multerConfig(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).send("Internal Server error");
      } else if (err) {
        return res.status(400).send(err.message);
      }
    }
    if (!req?.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: "Please upload at least one image" });
    }

    req.body.images = req.files.map((file) => file.filename);

    next();
  });
};

export default multerMiddleware;
