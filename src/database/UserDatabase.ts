import { BaseDatabase } from "../database/BaseDatabase";

export class UserDatabase extends BaseDatabase {
  private USER_TABLE = "users";

  signup = async (newUser: any): Promise<any> => {
    const token = await BaseDatabase.connection(this.USER_TABLE).insert(
      newUser
    );
    return token;
  };

  login = async (email: any, password: any): Promise<any> => {
    const token = await BaseDatabase.connection(this.USER_TABLE)
      .where({
        email,
      })
      .andWhere({
        password,
      });

    return token;
  };

  findUserById = async (id: string) => {
    const [user] = await BaseDatabase.connection(this.USER_TABLE).where({ id });
    console.log(user);
    return user;
  };
}
