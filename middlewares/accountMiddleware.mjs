import accountValidator from "../validator/account/accountValidator.mjs";

const {
  createAccountValidation,
  signInValidation,
  forgetPasswordEmail,
  forgetPasswordPassword
} = accountValidator;

const accountMiddleware = {
  createAccountMiddleware: createAccountValidation,
  signInMiddleware: signInValidation,
  forgetPasswordEmailMiddleware: forgetPasswordEmail,
  forgetPasswordPasswordMiddleware: forgetPasswordPassword
};

export default accountMiddleware;