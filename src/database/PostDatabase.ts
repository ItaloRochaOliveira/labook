import { BaseDatabase } from "../database/BaseDatabase";
import { PostDB } from "../models/Post";

export class PostDatabase extends BaseDatabase {
  private POST_TABLE = "posts";

  findAllPosts = async (): Promise<PostDB[]> => {
    const postsDB: PostDB[] = await BaseDatabase.connection(this.POST_TABLE);

    return postsDB;
  };

  findPostById = async (id: string): Promise<PostDB[]> => {
    const postDB: PostDB[] = await BaseDatabase.connection(
      this.POST_TABLE
    ).where({ id });

    return postDB;
  };

  createPost = async (newPost: any): Promise<string> => {
    await BaseDatabase.connection(this.POST_TABLE).insert(newPost);

    return "Criado post com sucesso!";
  };

  editPost = async (updatePost: any, id: string): Promise<string> => {
    await BaseDatabase.connection(this.POST_TABLE).update(updatePost).where({
      id,
    });

    return "Editado post com sucesso!";
  };

  deletePost = async (id: string): Promise<string> => {
    await BaseDatabase.connection(this.POST_TABLE).del().where({ id });

    return "Excluido com sucesso!";
  };
}
