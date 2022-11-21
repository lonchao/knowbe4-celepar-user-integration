import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateCLiente(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ message: "Token is missing" });
  }
  const [, token] = authHeader.split(" ");

  try {
    const { sub } = verify(token, process.env.TOKEN_SECRET) as IPayload;
    console.log(sub);
    request.user_id = sub;
    //can usage in controller request.user_id

    return next();
  } catch (err) {
    return response.status(401).json({ message: "Invalid token" });
  }
}
