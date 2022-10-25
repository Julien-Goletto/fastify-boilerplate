export default interface TokensPayload {
  id: number;
  pseudo: string;
  is_admin: boolean;
  iat?: number;
  exp?: number;
}