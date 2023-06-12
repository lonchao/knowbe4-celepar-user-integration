import { Request, Response } from "express";
import { AuthenticateCeleparUseCase } from "../../celeparUsers/useCases/authenticateCelepar/AuthenticateCeleparUseCase";
import { SearchUsersUseCase } from "../../celeparUsers/useCases/searchUsers/SearchUsersUseCase";
import { GetGroupUseCase } from "../../celeparUsers/useCases/getGroup/GetGroupUseCase";
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
    const getGroupUseCase = new GetGroupUseCase();
    let resultGroup = await getGroupUseCase.execute({
      celepar_token: auth.token,
      group_name: "grupo-celepar-ciber",
    });

    // let result = await searchUsersUseCase.execute({
    //   celepar_token: auth.token,
    //   field: "email",
    //   value: "*@celepar.pr.gov.br",
    // });
    // if (result.entries) {
    //   console.log("result.entries");
    //   result = Object.keys(result.entries).map(function (key, index) {
    //     return result.entries[key];
    //   });
    // }

    const startTime = new Date();
    console.log("resultGroup", resultGroup.length, startTime);

    const promissesGroup: any[] = [];

    function delay(time: number) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    const executeSync = async (user: ICeleparUser) => {
      // console.log(user.accountCn,user.accountMail);
      if (user.accountMail) {
        // console.log("user.accountMail", user.accountMail);
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
          return `updated ${user.accountId} ${user.accountCn} ${user.accountMail}`;
        } else {
          //create
          const createUserKnowbe4 = new CreateUserKnowbe4();
          createUserKnowbe4.execute({
            username: user.accountMail,
            firstname: nameSplitted.firstName,
            lastname: nameSplitted.lastName,
            externalId: user.accountId,
          });
          return `created ${user.accountId} ${user.accountCn} ${user.accountMail}`;
        }
      }
    };

    const executeSearch = async (accountUid: string, delayTime: number) => {
      await delay(delayTime);
      if (accountUid) {
        // console.log("executeSearch", accountUid, delayTime / 1000);
        let result = await searchUsersUseCase.execute({
          celepar_token: auth.token,
          field: "uid",
          value: accountUid,
        });

        // if (result.entries[0].accountCn.indexOf("DESATIVADO") > -1) {
        console.log(
          accountUid,
          result.entries[0].accountCn,
          result.entries[0].accountMail,
          delayTime / 100
        );
        // }
        return await executeSync(result.entries[0]);
        return result.entries[0];
      } else {
        return {};
      }
    };
    // resultGroup = [
    //   resultGroup[1112],
    //   resultGroup[1113],
    //   resultGroup[1114],
    //   resultGroup[1115],
    // ];
    console.log("resultGroup", resultGroup.length);
    resultGroup.forEach((accountUid: string, index: number) => {
      promissesGroup.push(executeSearch(accountUid, index * 500));
    });

    Promise.all(promissesGroup);
    // const result = await Promise.all(promissesGroup);

    // console.log("result.entries after", result.length);
    // if (result && result.length > 0) {
    //   const promisses: any[] = [];

    //   result.forEach((user: ICeleparUser) => {
    //     promisses.push(execute(user));
    //   });

    //   const responses = await Promise.all(promisses);
    //   //   console.log(responses);
    //   return response.json({
    //     message: `${result.length} synced`,
    //     startTime,
    //     endTime: new Date(),
    //     responses,
    //   });
    // }

    return response.json({
      message: `started synced`,
      startTime,
      // endTime: new Date(),
      results: resultGroup.length,
      resultGroup: resultGroup,
    });
  }
}
