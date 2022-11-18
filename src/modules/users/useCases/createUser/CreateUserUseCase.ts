import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
interface ICreateUser {
  username: string;
  password: string;
}
export class CreateUserUseCase {
  async execute({ username, password }: ICreateUser) {
    const userExists = await prisma.apiUsers.findFirst({
      where: {
        username: {},
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }
    const hashPassword = await hash(password, 10);
    const apiUser = await prisma.apiUsers.create({
      data: { username, password: hashPassword },
    });

    return apiUser;
  }
}
