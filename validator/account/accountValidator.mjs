import createAccountValidation from "./validation/createAccountValidation.mjs";
import signInValidation from "./validation/signInValidation.mjs";
import { forgetPasswordEmail, forgetPasswordPassword } from "./validation/forgetPasswordValidation.mjs";

const accountValidator = {
  createAccountValidation,
  signInValidation,
  forgetPasswordEmail,
  forgetPasswordPassword
};

export default accountValidator;
