import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;
    const uthenticateUserUseCase = new AuthenticateUserUseCase();
    const result = await uthenticateUserUseCase.execute({ username, password });
    return response.json({ token: result });
  }
}
