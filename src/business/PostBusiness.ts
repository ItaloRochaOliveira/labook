import { randomUUID } from "crypto";
import { PostDatabase } from "../database/PostDatabase";
import { Post, PostDB, PostModel } from "../models/Post";
import { UserDatabase } from "../database/UserDatabase";
import { LikesDislikesDatabase } from "../database/LikesDislikesDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGerator } from "../services/IdGerator";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesOrDislikeDatabase: LikesDislikesDatabase,
    private tokenManager: TokenManager,
    private idGerator: IdGerator
  ) {}

  getPosts = async (token: string): Promise<PostModel[]> => {
    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new Error("User não cadastrado.");
    }

    const postsDB = await this.postDatabase.findAllPosts();

    let posts: PostModel[] = [];

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

      const postToResult: PostModel = {
        id: post.ID,
        content: post.CONTENT,
        likes: post.LIKES,
        dislikes: post.DISLIKES,
        createdAt: post.CREATEDAT,
        updatedAt: post.CREATEDAT,
        creator: post.CREATOR,
      };

      posts.push(postToResult);
    }

    return posts;
  };

  createPost = async (userPost: any) => {
    const { token, content } = userPost;

    const id = this.idGerator.gerate();

    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new Error("User inexistente.");
    }

    const newPost = {
      id,
      creator_id: tokenPayload.id,
      content,
      likes: 0,
      dislikes: 0,
      created_at: new Date().toISOString(),
      updated_at: "",
    };

    const response = await this.postDatabase.createPost(newPost);

    return response;
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

    const [postLikedExistDB] =
      await this.likesOrDislikeDatabase.findLikesAndDislikesById(idUser);

    const [postDB] = await this.postDatabase.findPostById(idPost);

    if (!postLikedExistDB) {
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

      if (!like && postLikedExistDB.like === null) {
        updatePost = { ...postDB, dislikes: postDB.dislikes + 1 };
      } else if (like && postLikedExistDB.like === null) {
        updatePost = { ...postDB, likes: postDB.likes + 1 };
      }

      if (likeDB === postLikedExistDB.like) {
        likeDB === 0
          ? (updatePost = { ...postDB, dislikes: postDB.dislikes - 1 })
          : (updatePost = { ...postDB, likes: postDB.likes - 1 });

        newUserLikeOrDislikeDB = { ...newUserLikeOrDislikeDB, like: null };
      }

      if (likeDB === 0 && postLikedExistDB.like === 1) {
        updatePost = {
          ...postDB,
          dislikes: postDB.dislikes + 1,
          likes: postDB.likes - 1,
        };
      } else if (likeDB === 1 && postLikedExistDB.like === 0) {
        updatePost = {
          ...postDB,
          dislikes: postDB.dislikes - 1,
          likes: postDB.likes + 1,
        };
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
