import { Router } from "express";

import account from "../../controllers/accountController.mjs";
import accountMiddleware from "../../middlewares/accountMiddleware.mjs";

import validateRequest from "../../middlewares/validateRequest.mjs";

const accountRoutes = Router();

const { signUp, signIn, forgetPassword, resetPassword } = account;
const { createAccountMiddleware, signInMiddleware, forgetPasswordEmailMiddleware, forgetPasswordPasswordMiddleware } = accountMiddleware;

accountRoutes.post("/signup", createAccountMiddleware, signUp); // createAccountMiddleware handles its own error check logic inside array
accountRoutes.post("/signin", signInMiddleware, validateRequest, signIn);
accountRoutes.post("/forget-password", forgetPasswordEmailMiddleware, validateRequest, forgetPasswordPasswordMiddleware, validateRequest, forgetPassword);
accountRoutes.post("/reset-password", resetPassword);

export default accountRoutes;

//6902075e16fc85150a8a4e59 => USER ID
//6902075e16fc85150a8a4e5a => CREATOR ID