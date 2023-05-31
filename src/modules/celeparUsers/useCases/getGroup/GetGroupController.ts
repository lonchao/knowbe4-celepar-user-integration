import { Request, Response } from "express";
import { AuthenticateCeleparUseCase } from "../authenticateCelepar/AuthenticateCeleparUseCase";
import { GetGroupUseCase } from "./GetGroupUseCase";

export class GetGroupController {
  async handle(request: Request, response: Response) {
    const { group_name } = request.body;

    if (!group_name) {
      throw new Error("Group Name is required");
    }
    const authenticateCeleparUseCase = new AuthenticateCeleparUseCase();
    const auth = await authenticateCeleparUseCase.execute();
    const searchUsersUseCase = new GetGroupUseCase();
    const result = await searchUsersUseCase.execute({
      celepar_token: auth.token,
      group_name,
    });

    return response.json(result);
  }
}
