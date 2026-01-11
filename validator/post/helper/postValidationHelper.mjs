import { body } from "express-validator";
const postValidationHelper = [
  body("title")
    .optional()
    .trim()
    .isLength({
      max: 150,
    })
    .withMessage("Title must not exceed 150 characters."),
  body("description")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 250 })
    .withMessage("Description must not exceed 250 characters."),
  body("location").optional().trim().escape().isLength({ max: 100 }),

  body("images").isArray({ min: 1 }),
];

export default postValidationHelper;
