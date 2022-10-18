import { SchemasCollection } from '../../types/Schema';

const userSchemas : SchemasCollection = {
  getUsers : {
    $id: 'getUsers',
    type: 'object',
    properties:{
      id: { type: 'number'},
      pseudo: { type: 'string'},
      is_admin: { type: 'boolean'},
      createdAt: { type: 'string'},
      updatedAt: { type: 'string'},
    },
    required: [ 'id', 'pseudo', 'is_admin', 'createdAt', 'updatedAt' ],
  },
};

export default userSchemas;