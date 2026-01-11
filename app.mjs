import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.mjs";

import routing from "./router/router.mjs";

const { ROLE, ACCOUNT, POST } = routing;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use('/uploads', express.static("uploads"));

/* ROUTING IMPLEMENTS */
app.use("/api/v1/role", ROLE);
app.use("/api/v1/account", ACCOUNT);
app.use("/api/v1/post", POST);

app.use(errorHandlerMiddleware);

export default app;

// CREATOR PASSWORD Password@123
