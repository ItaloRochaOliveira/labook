import { BadRequestError } from "../customErrors/BadRequestError";
import { NotFoundError } from "../customErrors/NotFoundError";
import { UserDatabase } from "../database/UserDatabase";
import { LoginInputDTO } from "../dtos/userDTO/login.dto";
import { SignupInputDTO, SignupOutputDTO } from "../dtos/userDTO/signup.dto";
import { TokenPayload, USER_ROLES, UserDB, Users } from "../models/Users";
import { HashManager } from "../services/HashManager";
import { IdGerator } from "../services/IdGerator";
import { TokenManager } from "../services/TokenManager";

export class userBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private idGerator: IdGerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager
  ) {}

  signup = async (input: SignupInputDTO) => {
    const { name, email, password } = input;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (userDB) {
      throw new BadRequestError("Usuário já existe com esse email.");
    }

    const id = this.idGerator.gerate();

    const passwordHash = await this.hashManager.hash(password);

    const newUser = new Users(
      id,
      name,
      email,
      passwordHash,
      USER_ROLES.NORMAL,
      new Date().toISOString()
    );

    const newUserDB = newUser.toDBModel();

    await this.userDatabase.signup(newUserDB);

    const TokenPayload = {
      id: newUser.ID,
      name: newUser.NAME,
      role: newUser.ROLE,
    };

    const token: string = this.tokenManager.createToken(TokenPayload);

    const response: SignupOutputDTO = {
      message: "user criado com sucesso",
      token,
    };

    return response;
  };

  login = async (userLogin: LoginInputDTO) => {
    const { email, password } = userLogin;

    const userDB = await this.userDatabase.findUserByEmail(email);

    if (!userDB) {
      throw new NotFoundError("Email informado errado ou inexistente.");
    }

    const passwordHash = userDB.password;

    const isPasswordCorrect = await this.hashManager.compare(
      password,
      passwordHash
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError("Senha informada incorreta.");
    }

    const user = new Users(
      userDB.id,
      userDB.name,
      userDB.email,
      userDB.password,
      userDB.role,
      userDB.created_at
    );

    const tokenPayload = user.toUserPayloadModel();

    const token = this.tokenManager.createToken(tokenPayload);

    const response = {
      message: "Usuário logado com sucesso.",
      token,
    };

    return response;
  };
}
