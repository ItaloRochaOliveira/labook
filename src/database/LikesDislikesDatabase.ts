import { BaseDatabase } from "./BaseDatabase";

export class LikesDislikesDatabase extends BaseDatabase {
  private LIKESDISLIKES_TABLE = "likes_dislikes";

  likeAndDislike = async (newLikeOrDislike: any, headers: string) => {
    if (newLikeOrDislike.value) {
      await BaseDatabase.connection(this.LIKESDISLIKES_TABLE)
        .update(newLikeOrDislike)
        .where(newLikeOrDislike.id);
    } else {
      await BaseDatabase.connection(this.LIKESDISLIKES_TABLE)
        .update(newLikeOrDislike)
        .where(newLikeOrDislike.id);
    }

    return "Atualizado com sucesso!";
  };
}
