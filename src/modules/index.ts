import userRoutes from "./user/user.route";
import userSchemas from "./user/user.schema";

export const routes = [
  {
    id: 'user',
    prefix: 'api/users',
    routes: userRoutes,
  }
];

export const schemas = [
  userSchemas,
];
