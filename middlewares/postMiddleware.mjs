import postValidation from "../validator/post/postValidator.mjs";

const { createPostValidation } = postValidation;
const postMiddleware = {
  createPostValidation,
};

export default postMiddleware;