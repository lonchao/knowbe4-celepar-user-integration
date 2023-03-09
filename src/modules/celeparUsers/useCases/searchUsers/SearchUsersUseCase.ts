import api from "../../../../services/CeleparApi";

interface ISearchUser {
  celepar_token: string;
  field: string;
  value: string;
}

export class SearchUsersUseCase {
  fields = [
    {
      label: "email",
      field: "accountSearchMail",
    },
    {
      label: "name",
      field: "accountSearchCN",
    },
    {
      label: "cpf",
      field: "accountSearchCPF",
    },
    {
      label: "rg",
      field: "accountSearchRG",
    },
    {
      label: "uid",
      field: "accountSearchUID",
    },
  ];
  async execute({ celepar_token, field, value }: ISearchUser) {
    const selectedField = this.fields.find((item) => {
      return item.label === field;
    });
    if (!selectedField) {
      throw new Error("error searching on Celepar [Invalid Field] ");
    }

    const response = await api.post("Admin/SearchLdap", {
      id: 1,
      params: `{"auth":"${celepar_token}","${selectedField.field}":"${value}"}`,
    });
    if (!response || !response.data.result) {
      throw new Error("error searching on Celepar");
    }

    return response.data.result.result;
  }
}
