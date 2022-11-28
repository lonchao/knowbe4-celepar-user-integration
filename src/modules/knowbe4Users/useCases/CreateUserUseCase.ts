import api from "../../../services/Knowbe4Api";
import { Knowbe4UserSchema } from "../types/Knowbe4User";

interface ICreateUser {
  username: string;
  firstname: string;
  lastname: string;
  externalId: string;
}

export class CreateUserUseCase {
  async execute({ username, firstname, lastname, externalId }: ICreateUser) {
    const userData: Knowbe4UserSchema = {
      schemas: ["urn:ietf:params:scim:schemas:core:2.0:User"],
      userName: username,
      name: {
        givenName: firstname,
        familyName: lastname,
      },
      emails: [
        {
          type: "work",
          value: username,
          primary: true,
        },
      ],
      externalId: externalId,
      locale: "en-US",
      groups: [],
      active: true,
    };

    try {
      const response = await api.post("Users", userData);

      return response.data;
    } catch (e) {
      console.log(e);
      throw new Error(`Error creating User`);
    }
  }
}
