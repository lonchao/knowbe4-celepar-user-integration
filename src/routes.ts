import { Router } from "express";
import { ensureAuthenticateCLiente } from "./middlewares/ensureAuthenticateUser";
import { AuthenticateUserController } from "./modules/account/authenticateUser/AuthenticateUserController";
import { CreateUserController } from "./modules/users/useCases/createUser/CreateUserController";
import { SearchUserController } from "./modules/celeparUsers/useCases/searchUsers/SearchUserController";
const routes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const searchUserController = new SearchUserController();

routes.post("/user/", createUserController.handle);

routes.post("/authenticate/", authenticateUserController.handle);
routes.post(
  "/search-user/",
  ensureAuthenticateCLiente,
  searchUserController.handle
);

export { routes };
