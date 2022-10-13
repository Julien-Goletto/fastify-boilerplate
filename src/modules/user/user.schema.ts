export interface Schema {
  $id: string;
  type: string;
  properties: object;
  required: string [];
}

export interface SchemasCollection {
  [key: string] : Schema;
}

const userSchemas : SchemasCollection = {
  getUsers : {
    $id: 'getUsers',
    type: 'object',
    properties:{
      id: { type: 'number'},
      pseudo: { type: 'string'},
      mail: { type: 'string'},
      createdAt: { type: 'string'},
      updatedAt: { type: 'string'},
    },
    required: [ 'id', 'pseudo', 'mail', 'createdAt', 'updatedAt' ],
  },
};

export default userSchemas;