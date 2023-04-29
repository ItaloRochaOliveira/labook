import { BaseDatabase } from "../database/BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private POST_TABLE = "posts";

  findPosts = async (headers: any): Promise<any> => {
    const postsDB = await BaseDatabase.connection(this.POST_TABLE).where({
      id: headers,
    });

    return postsDB;
  };

  createPost = async (newPost: any, headers: any): Promise<any> => {
    await BaseDatabase.connection(this.POST_TABLE).insert(newPost).where({
      id: headers,
    });

    return "Criado post com sucesso!";
  };

  editPost = async (updatePost: any, headers: any): Promise<any> => {
    await BaseDatabase.connection(this.POST_TABLE).insert(updatePost).where({
      id: headers,
    });

    return "Criado post com sucesso!";
  };

  deletePost = async (id: any, headers: any) => {
    await BaseDatabase.connection(this.POST_TABLE).del().where(id);

    return "Excluido com sucesso!";
  };

  like = async (headers: any) => {
    await BaseDatabase.connection(this.POST_TABLE).update(1).where(headers);
  };
}
