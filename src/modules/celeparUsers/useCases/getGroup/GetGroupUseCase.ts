import api from "../../../../services/CeleparApi";

interface IGetGroup {
  celepar_token: string;
  group_name: string;
}

export class GetGroupUseCase {
  async execute({ celepar_token, group_name }: IGetGroup) {
    const response = await api.post("Admin/GetGroup", {
      params: `{"auth":"${celepar_token}","cn":"${group_name}"}`,
    });
    if (!response || !response.data.result) {
      throw new Error("error searching on Celepar");
    }

    return response.data.result.memberuid;
  }
}
