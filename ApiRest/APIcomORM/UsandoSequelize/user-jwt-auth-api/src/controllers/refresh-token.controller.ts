import { Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { RefreshToken } from "../models/refresh-token.model";

export const createRefreshToken = async (
  userUUID: string,
  req: Request
): Promise<string> => {
  let _token = uuidv4();
  let expireAt = new Date();
  let jwtRefreshExpiration = Number(process.env.JWT_REFRESH_EXPIRATION);
  expireAt.setSeconds(expireAt.getSeconds() + jwtRefreshExpiration);

  req.body = {
    token: _token,
    expiryDate: expireAt.getTime(),
    user_uuid: userUUID,
  };

  const token = await RefreshToken.create({ ...req.body }, { raw: true }).then(
    (token): string => {
      return token.getDataValue("token");
    }
  );

  return token;
};

export const verifyExpiration = (token: RefreshToken) => {
  return token.getDataValue("expiryDate").getTime() < new Date().getTime();
};
