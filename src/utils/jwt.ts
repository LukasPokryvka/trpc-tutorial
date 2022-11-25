import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET || "changeme";

export const signJwt = (data: object) => jwt.sign(data, SECRET);
export function verifyJwt<T>(token: string) {
  return jwt.verify(token, SECRET) as T;
}
