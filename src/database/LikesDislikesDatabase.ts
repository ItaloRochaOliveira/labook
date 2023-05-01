import { BaseDatabase } from "./BaseDatabase";

export class LikesDislikesDatabase extends BaseDatabase {
  private LIKESDISLIKES_TABLE = "likes_dislikes";

  findLikesAndDislikesById = async (user_id: any) => {
    const postLikedDB = await BaseDatabase.connection(
      this.LIKESDISLIKES_TABLE
    ).where({ user_id });

    return postLikedDB;
  };

  newLikesDislikes = async (newUserLikeOrDislike: any) => {
    await BaseDatabase.connection(this.LIKESDISLIKES_TABLE).insert(
      newUserLikeOrDislike
    );

    return "Atualizado com sucesso!";
  };

  updateLikeOrDislike = async (post_id: string, newLikeOrDislike: any) => {
    await BaseDatabase.connection(this.LIKESDISLIKES_TABLE)
      .update(newLikeOrDislike)
      .where({ post_id });

    return "Atualizado com sucesso!";
  };

  deleteLikeOrDislike = async (post_id: string) => {
    await BaseDatabase.connection(this.LIKESDISLIKES_TABLE)
      .del()
      .where({ post_id });
  };
}
