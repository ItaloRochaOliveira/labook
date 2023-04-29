import { UserDatabase } from "../database/UserDatabase";

export class userBusiness {
  constructor(private userDatabase: UserDatabase) {}

  getRandomInt() {
    const min = Math.ceil(1);
    const max = Math.floor(10);
    return Math.floor(Math.random() * (max - min) + min);
  }

  signup = async (input: any) => {
    const { name, email, password } = input;

    const newUser = {
      id: `u${this.getRandomInt()}${this.getRandomInt()}${this.getRandomInt()}`,
      name,
      email,
      password,
      role: "normal",
      created_at: new Date().toISOString(),
    };

    const token = await this.userDatabase.signup(newUser);

    return token;
  };

  login = async (user: any) => {
    const { email, password } = user;

    const token = await this.userDatabase.login(email, password);

    return token;
  };
}
