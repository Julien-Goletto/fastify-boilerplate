import { RouteSchemasCollection } from "../../types/Schema";

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
    headers: { headers: { $ref : 'authRefreshTokensHeaders' }},
    response: {
      "200": { $ref: 'authRefreshTokensResponse' }
    }
  }
};

export default routesSchemas;