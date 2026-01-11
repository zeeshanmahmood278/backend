import ACCOUNT from "../models/accountModel.mjs";
import ROLE from "../models/roleModel.mjs";
import jwt from "jsonwebtoken";
import {
  bcryptPasswordHashingService,
  bcryptPasswordComparingService,
} from "../services/bcryptPasswordService.mjs";
import customError from "../utils/customError.mjs";

const generateToken = (id, role) => {
  return jwt.sign({ _id: id, role }, process.env.ACCESS_TOKEN_SECRET || "default_secret_key", {
    expiresIn: "30d",
  });
};

const signUp = async (req, res, next) => {
  const { accountType, username, email, password } = req?.body;
  try {
    const hashPassword = await bcryptPasswordHashingService(password);
    /* */
    const { _id: roleId } = await ROLE.findOne({ name: accountType }, "_id");
    const document = {
      accountType: roleId,
      username,
      email,
      password: hashPassword,
    };
    const newAccount = await new ACCOUNT(document);
    const { _id: accountID } = await newAccount.save();

    await ROLE.findOneAndUpdate(
      { name: accountType },
      {
        $push: {
          users: accountID,
        },
      }
    );

    const token = generateToken(accountID, accountType);

    res.status(201).json({
       message: "Account created successfully.",
       token, 
       user: {
         _id: accountID,
         username: username,
         email: email,
         role: accountType
       }
    });
  } catch (error) {
    next(error);
  }
};
const signIn = async (req, res, next) => {
  const authenticationFailed =
    "Login failed. The email or password you entered is incorrect.";

  const { email, password } = req?.body;

  try {
    const account = await ACCOUNT.findOne({ email })
        .select("_id password username email accountType")
        .populate("accountType", "name");

    if (account == null) {
      return next(new customError(authenticationFailed, 401));
    }

    const { _id, password: encryptedPassword, username, accountType } = account;
    const verifyPassword = await bcryptPasswordComparingService(
      password,
      encryptedPassword
    );

    if (!verifyPassword) {
      return next(new customError(authenticationFailed, 401));
    }

    const roleName = accountType?.name || "user"; // Default to user if issue
    const token = generateToken(_id, roleName);

    res.status(200).json({
      message: "Welcome back! You're logged in.",
      token,
      user: {
        _id,
        username,
        email,
        role: roleName
      }
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  const { email,password } = req?.body;
  try {
    const document = await ACCOUNT.findOne({ email }, "_id");
    if (document == null) {
      return next(
        new customError(
          "Could not initiate password reset. Please check the email address and try again.",
          404
        )
      );
    }
    const hashPassword = await bcryptPasswordHashingService(password);
    const updateAccountPassword = await ACCOUNT.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );

    res.status(200).send(`You can now log in to your account using your new password.`);
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const {password} = req?.body;
  try {
    const hashPassword = await bcryptPasswordHashingService(password);
    const updateAccountPassword = await ACCOUNT.findOneAndUpdate(
      { email },
      { password: hashPassword }
    );
  } catch {
    next(error);
  }
};

const account = { signUp, signIn, forgetPassword, resetPassword };
export default account;