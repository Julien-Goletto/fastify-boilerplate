import { RouteSchemasCollection } from "../user/user.route.schema";

const routesSchemas : RouteSchemasCollection = {
  register : {
    body: { $ref: 'authRegisterLoginPayload' },
    response: {
      "201": { $ref: 'authRegisterResponse' },
    },
  },
  login : {
    body: { $ref: 'authRegisterLoginPayload' },
    response: {
      "200": { $ref: 'authLoginResponse' }
    }
  },
  refreshTokens : {
    response: {
      "200": { $ref: 'authRefreshTokensResponse' }
    }
  }
};

export default routesSchemas;