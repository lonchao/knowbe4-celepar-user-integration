import api from "../../../../services/CeleparApi";

interface ICeleparUser {
  id: string;
  token: string;
}
export class AuthenticateCeleparUseCase {
  async execute() {
    const response = await api.post("Login", {
      id: 1,
      params: `{"user":"${process.env.CELEPAR_USERNAME}","password":"${process.env.CELEPAR_PASSWORD}"}`,
    });
    if (!response || !response.data) {
      throw new Error("error autheticating on Celepar");
    }

    return {
      id: response.data.id,
      token: response.data.result.auth,
    } as ICeleparUser;
  }
}
