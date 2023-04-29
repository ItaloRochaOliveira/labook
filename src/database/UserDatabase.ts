import { BaseDatabase } from "../database/BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private USER_TABLE = "users";

  signup = async (newUser: any): Promise<any> => {
    const token = await BaseDatabase.connection(this.USER_TABLE).insert(
      newUser
    );
    return token;
  };

  login = async (user: any): Promise<any> => {
    const token = await BaseDatabase.connection(this.USER_TABLE).where({
      email: user.email,
    });

    return token;
  };
}
