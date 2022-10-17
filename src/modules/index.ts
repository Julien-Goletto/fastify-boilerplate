import userRoutes from "./user/user.route";
import authRoutes from "./auth/auth.route";
import userSchemas from "./user/user.schema";
import authSchemas from "./auth/auth.schema";

export const routes = [
  {
    id: 'user',
    prefix: 'api/users',
    routes: userRoutes,
  },
  {
    id: 'auth',
    prefix: 'api/auth',
    routes: authRoutes,
  }
];

export const schemas = [
  userSchemas,
  authSchemas,
];
