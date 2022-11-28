import api from "../../../services/Knowbe4Api";
import { Knowbe4UserSchema } from "../types/Knowbe4User";

interface ISearchUser {
  username: string;
}

export class SearchUserUseCase {
  async execute({ username }: ISearchUser) {
    try {
      const response = await api.get(`Users?filter=userName eq "${username}"`);
      //   console.log(response.data.Resources[0]);
      if (response.data?.Resources[0]) {
        return response.data?.Resources[0] as Knowbe4UserSchema;
      }
    } catch (e) {
      console.log("Error searching User", e);
      throw new Error(`Error searching User`);
    }
    return null! as Knowbe4UserSchema;
  }
}
