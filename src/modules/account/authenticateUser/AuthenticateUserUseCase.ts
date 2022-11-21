import { prisma } from "../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
interface IAuthenticateUser {
  username: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ username, password }: IAuthenticateUser) {
    const user = await prisma.apiUsers.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      throw new Error("Username or password invalid");
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Username or password invalid");
    }
    const token = sign({ username }, process.env.TOKEN_SECRET, {
      subject: user.id,
      expiresIn: "1d",
    });
    return token;
  }
}
