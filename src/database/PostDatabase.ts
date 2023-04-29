import { BaseDatabase } from "../database/BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private POST_TABLE = "posts";

  findAllPosts = async (): Promise<any> => {
    const postsDB = await BaseDatabase.connection(this.POST_TABLE);

    return postsDB;
  };

  createPost = async (newPost: any): Promise<any> => {
    await BaseDatabase.connection(this.POST_TABLE).insert(newPost);

    return "Criado post com sucesso!";
  };

  editPost = async (updatePost: any, headers: any): Promise<any> => {
    await BaseDatabase.connection(this.POST_TABLE).update(updatePost).where({
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
