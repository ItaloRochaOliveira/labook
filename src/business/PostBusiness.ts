import { randomUUID } from "crypto";
import { PostDatabase } from "../database/PostDatabase";
import { Post, PostDB } from "../models/Post";
import { UserDatabase } from "../database/UserDatabase";
import { LikesDislikesDatabase } from "../database/LikesDislikesDatabase";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesOrDislikeDatabase: LikesDislikesDatabase
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

  updatePost = async (content: string, id: string) => {
    const [postDB] = await this.postDatabase.findPostById(id);

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.createdAt,
      new Date().toISOString()
    );

    content && (post.CONTENT = content);

    const updatePostDB: PostDB = {
      id: post.ID,
      content: post.CONTENT,
      likes: post.LIKES,
      dislikes: post.DISLIKES,
      created_at: post.CREATEDAT,
      updated_at: post.UPDATEDAT,
    };

    const response = await this.postDatabase.editPost(updatePostDB, id);
    return response;
  };

  deletePost = async (id: string) => {
    const response = await this.postDatabase.deletePost(id);

    return response;
  };

  likeOrDislikeBusiness = async (
    idPost: string,
    idUser: string,
    like: boolean
  ) => {
    let response;

    const likeDB = !like ? 0 : 1;

    let newUserLikeOrDislikeDB: {
      user_id: string;
      post_id: string;
      like: number | null;
    } = {
      user_id: idUser,
      post_id: idPost,
      like: likeDB,
    };

    const [postExistDB] =
      await this.likesOrDislikeDatabase.findLikesAndDislikesById(idUser);

    console.log(postExistDB);

    const [postDB] = await this.postDatabase.findPostById(idPost);

    console.log(postDB);

    if (!postExistDB) {
      let updatePost;
      if (!like) {
        updatePost = { ...postDB, dislike: postDB.dislike + 1 };
      } else {
        updatePost = { ...postDB, likes: postDB.likes + 1 };
      }
      await this.postDatabase.editPost(updatePost, idPost);

      response = await this.likesOrDislikeDatabase.newLikesDislikes(
        newUserLikeOrDislikeDB
      );
    } else {
      let updatePost;

      if (!like) {
        updatePost = { ...postDB, dislikes: postDB.dislikes + 1 };
      } else {
        updatePost = { ...postDB, likes: postDB.likes + 1 };
      }

      if (likeDB === postExistDB.like) {
        likeDB === 0
          ? (updatePost = { ...postDB, dislikes: postDB.dislikes - 1 })
          : (updatePost = { ...postDB, likes: postDB.likes - 1 });

        newUserLikeOrDislikeDB = { ...newUserLikeOrDislikeDB, like: null };
      } else if (likeDB === postExistDB.like) {
        updatePost = { ...postDB, dislikes: postDB.dislikes - 1 };
        newUserLikeOrDislikeDB = { ...newUserLikeOrDislikeDB, like: null };
      }

      if (postExistDB.like === 1 && likeDB === 0) {
        console.log("entrou");
        updatePost = { ...postDB, likes: postDB.likes - 1 };
        updatePost = { ...postDB, dislikes: postDB.dislikes + 1 };
      } else if (postExistDB.like === 0 && likeDB === 1) {
        console.log("entrou");
        updatePost = { ...postDB, dislikes: postDB.dislikes - 1 };
        updatePost = { ...postDB, likes: postDB.likes + 1 };
      }

      await this.postDatabase.editPost(updatePost, idPost);

      response = await this.likesOrDislikeDatabase.updateLikeOrDislike(
        idPost,
        newUserLikeOrDislikeDB
      );
    }

    return response;
  };
}
