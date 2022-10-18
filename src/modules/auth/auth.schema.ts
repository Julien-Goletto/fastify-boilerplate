import { SchemasCollection } from '../../types/Schema';

const authSchemas : SchemasCollection = {
  authRegisterLoginPayload : {
    $id: 'authRegisterLoginPayload',
    type: 'object',
    properties:{
      pseudo: { type: 'string'},
      password: { type: 'string'},
    },
    required: [ 'pseudo', 'password' ],
  },
  authRegisterResponse : {
    $id: 'authRegisterResponse',
    type: 'object',
    properties:{
      message: { type: 'string'},
    },
    required: [ 'message' ],
  },
  authLoginResponse : {
    $id: 'authLoginResponse',
    type: 'object',
    properties:{
      user: {
        type: 'object',
        properties: {
          id: { type: 'number'},
          pseudo: { type: 'string'},
          is_admin: { type: 'boolean'},
        },
      },
      accessToken: { type: 'string'},
      response: { type: 'string'},
    },
    required: [ 'user', 'accessToken', 'response' ],
  },
  authRefreshTokensResponse : {
    $id: 'authRefreshTokensResponse',
    type: 'object',
    properties: {
      accessToken: { type: 'string'},
      response: { type: 'string'},
    },
    required: ['accessToken', 'response'],
  }
};

export default authSchemas;