import accountRoutes from "./routes/accountRoutes.mjs";
import roleRoutes from "./routes/roleRoutes.mjs";
import postRoutes from "./routes/postRoutes.mjs";
const routing = {
  ROLE: roleRoutes,
  ACCOUNT: accountRoutes,
  POST: postRoutes
};

export default routing;