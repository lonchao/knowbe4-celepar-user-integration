import { Request, Response } from "express";
import { AuthenticateCeleparUseCase } from "../../celeparUsers/useCases/authenticateCelepar/AuthenticateCeleparUseCase";
import { SearchUsersUseCase } from "../../celeparUsers/useCases/searchUsers/SearchUsersUseCase";
import { SearchUserUseCase as SearchUserKnowbe4 } from "./SearchUserUseCase";
import { UpdateUserUseCase as UpdateUserKnowbe4 } from "./UpdateUserUseCase";
import { CreateUserUseCase as CreateUserKnowbe4 } from "./CreateUserUseCase";

import SplitName from "../../../services/SplitName";

interface ICeleparUser {
  accountId: string;
  accountLid: string;
  accountDn: string;
  accountCn: string;
  accountMail: string;
  accountCpf: string;
  accountRG: string;
  accountRgUF: string;
  accountPhoto: string;
  accountHomeServer: string;
  accountProtectedFields: string;
}
export class SyncUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const authenticateCeleparUseCase = new AuthenticateCeleparUseCase();
    const auth = await authenticateCeleparUseCase.execute();
    const searchUsersUseCase = new SearchUsersUseCase();
    let result = await searchUsersUseCase.execute({
      celepar_token: auth.token,
      field: "name",
      value: "a",
    });

    if (result.entries) {
      result = Object.keys(result.entries).map(function (key, index) {
        return result.entries[key];
      });
    }
    if (result && result.length > 0) {
      const promisses: any[] = [];

      const execute = async (user: ICeleparUser) => {
        const searchUserKnowbe4 = new SearchUserKnowbe4();
        const userKnowbe4 = await searchUserKnowbe4.execute({
          username: user.accountMail,
        });
        const nameSplitted = SplitName(user.accountCn);
        if (userKnowbe4) {
          //update
          const updateUserKnowbe4 = new UpdateUserKnowbe4();
          updateUserKnowbe4.execute({
            username: user.accountMail,
            firstname: nameSplitted.firstName,
            lastname: nameSplitted.lastName,
            externalId: user.accountId,
            knowbe4Id: userKnowbe4.id || "",
          });

          return `updated ${user.accountId}`;
        } else {
          //create
          const createUserKnowbe4 = new CreateUserKnowbe4();
          createUserKnowbe4.execute({
            username: user.accountMail,
            firstname: nameSplitted.firstName,
            lastname: nameSplitted.lastName,
            externalId: user.accountId,
          });
          return `created ${user.accountId}`;
        }
      };

      result.forEach((user: ICeleparUser) => {
        promisses.push(execute(user));
      });

      const responses = await Promise.all(promisses);
      //   console.log(responses);
      return response.json({ message: `${result.length} synced`, responses });
    }

    return response.json({ message: `not synced`, result });
  }
}
