import { Request, Response } from "express";
import { AuthenticateCeleparUseCase } from "../authenticateCelepar/AuthenticateCeleparUseCase";
import { SearchUsersUseCase } from "./SearchUsersUseCase";

export class SearchUserController {
  async handle(request: Request, response: Response) {
    const { field, value } = request.body;

    if (!field || !value) {
      throw new Error("Field and value is required");
    }
    const authenticateCeleparUseCase = new AuthenticateCeleparUseCase();
    const auth = await authenticateCeleparUseCase.execute();
    const searchUsersUseCase = new SearchUsersUseCase();
    const result = await searchUsersUseCase.execute({
      celepar_token: auth.token,
      field,
      value,
    });

    return response.json(result);
  }
}
