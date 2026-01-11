import { Router } from "express";

import postMiddleware from "../../middlewares/postMiddleware.mjs";
import multerMiddleware from "../../middlewares/multerMiddleware.mjs";
/* VALIDATOR */
import idValidator from "../../validator/idValidator.mjs";
import idExistenceChecker from "../../validator/idExistenceChecker.mjs";
import likeValidator from "../../validator/like/likeValidator.mjs";
import commentValidator from "../../validator/comment/commentValidator.mjs";

import post from "../../controllers/postController.mjs";
import postModel from "../../models/postModel.mjs";

import authMiddleware from "../../middlewares/authMiddleware.mjs";
import validateRequest from "../../middlewares/validateRequest.mjs";

const { createPostValidation } = postMiddleware;
const idValidatorMiddleware = [idValidator, idExistenceChecker(postModel)];
const {
  createPost,
  deletePost,
  updatePost,
  likePost,
  addComment,
  deleteComment,
  getAllActivePost,
} = post;

const postRoutes = Router();

/* GET ROUTES */
postRoutes.get("/", getAllActivePost);

/* CREATE POST */
postRoutes.post("/", authMiddleware, multerMiddleware, createPostValidation, createPost);
/* UPDATE POST */
postRoutes.put("/:id", authMiddleware, idValidatorMiddleware, createPostValidation, updatePost);
/* DELETE POST */
postRoutes.delete("/:id", authMiddleware, idValidatorMiddleware, deletePost);

/* LIKE FUNCTIONALITY */
postRoutes.post(
  "/:id/like",
  authMiddleware,
  idValidator,
  idExistenceChecker(postModel),
  likeValidator,
  validateRequest,
  likePost
);

/* COMMENT FUNCTIONALITY */
postRoutes.post(
  "/:id/comment",
  authMiddleware,
  idValidator,
  idExistenceChecker(postModel),
  commentValidator,
  validateRequest,
  addComment
);

postRoutes.delete("/:id/comment", deleteComment);
export default postRoutes;
