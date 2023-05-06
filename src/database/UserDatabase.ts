import { BaseDatabase } from "../database/BaseDatabase";
import { UserDB } from "../models/Users";

export class UserDatabase extends BaseDatabase {
  private USER_TABLE = "users";

  signup = async (newUserDB: UserDB): Promise<void> => {
    await BaseDatabase.connection(this.USER_TABLE).insert(newUserDB);
  };

  findUserById = async (id: string): Promise<UserDB> => {
    const [user] = await BaseDatabase.connection(this.USER_TABLE).where({ id });

    return user;
  };

  findUserByEmail = async (email: string): Promise<UserDB> => {
    const [user] = await BaseDatabase.connection(this.USER_TABLE).where({
      email,
    });

    return user;
  };
}
