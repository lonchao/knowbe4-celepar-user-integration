import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;
    const createUserUseCase = new CreateUserUseCase();
    const result = await createUserUseCase.execute({ username, password });

    return response.json(result);
  }
}
