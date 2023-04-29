import { randomUUID } from "crypto";
import { PostDatabase } from "../database/PostDatabase";
import { Post } from "../models/Post";
import { UserDatabase } from "../database/UserDatabase";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase
  ) {}

  getPosts = async () => {
    const postsDB = await this.postDatabase.findAllPosts();

    let posts: any;

    for (let postDB of postsDB) {
      const { id, name } = await this.userDatabase.findUserById(
        postDB.creator_id
      );

      const post = new Post(
        postDB.id,
        postDB.content,
        postDB.likes,
        postDB.dislikes,
        postDB.created_at,
        postDB.updated_at,
        {
          id,
          name,
        }
      );

      posts = { ...posts, post };
    }

    return posts;
  };

  createPost = async (content: string) => {
    const newPost = {
      id: randomUUID(),
      creator_id: "u366",
      content,
      likes: 0,
      dislikes: 0,
      created_at: new Date().toISOString(),
      updated_at: "",
    };

    const result = await this.postDatabase.createPost(newPost);

    return result;
  };
}
