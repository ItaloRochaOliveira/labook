import { BaseDatabase } from "../database/BaseDatabase";

export class PostDatabase extends BaseDatabase {
  private POST_TABLE = "posts";

  findAllPosts = async (): Promise<any> => {
    const postsDB = await BaseDatabase.connection(this.POST_TABLE);

    return postsDB;
  };

  findPostById = async (id: string) => {
    const postDB = await BaseDatabase.connection(this.POST_TABLE).where({ id });

    return postDB;
  };

  createPost = async (newPost: any): Promise<any> => {
    await BaseDatabase.connection(this.POST_TABLE).insert(newPost);

    return "Criado post com sucesso!";
  };

  editPost = async (updatePost: any, id: string): Promise<any> => {
    await BaseDatabase.connection(this.POST_TABLE).update(updatePost).where({
      id,
    });

    return "Editado post com sucesso!";
  };

  deletePost = async (id: string) => {
    await BaseDatabase.connection(this.POST_TABLE).del().where({ id });

    return "Excluido com sucesso!";
  };
}
