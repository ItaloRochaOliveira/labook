import { PostDatabase } from "../database/PostDatabase";
import { Post, PostDB, PostModel } from "../models/Post";
import { UserDatabase } from "../database/UserDatabase";
import { LikesDislikesDatabase } from "../database/LikesDislikesDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGerator } from "../services/IdGerator";
import { CreatePostInputDTO } from "../dtos/postDTO/createPost.dto";
import { UpdatePostInputDTO } from "../dtos/postDTO/updatePost.dto";
import { DeletePostInputDTO } from "../dtos/postDTO/deletePost.dto";
import { GetPostInputDTO } from "../dtos/postDTO/GetPosts.dto";
import { likeOrDislikeInputDTO } from "../dtos/postDTO/LikeOrDislike.dto";
import { NotFoundError } from "../customErrors/NotFoundError";
import { BadRequestError } from "../customErrors/BadRequestError";
import { LikeOrDislikeDB } from "../models/LikeOrDislike";

export class PostBusiness {
  constructor(
    private postDatabase: PostDatabase,
    private userDatabase: UserDatabase,
    private likesOrDislikeDatabase: LikesDislikesDatabase,
    private tokenManager: TokenManager,
    private idGerator: IdGerator
  ) {}

  getPosts = async ({ token }: GetPostInputDTO): Promise<PostModel[]> => {
    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotFoundError("User não cadastrado.");
    }

    const postsDB = await this.postDatabase.findAllPosts();

    let posts: PostModel[] = [];

    for (let postDB of postsDB) {
      const { id, name } = await this.userDatabase.findUserById(
        postDB.creator_id as string
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

  createPost = async (userPost: CreatePostInputDTO) => {
    const { token, content } = userPost;

    const id = this.idGerator.gerate();

    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotFoundError("User inexistente.");
    }

    const newPost = new Post(
      id,
      content,
      0,
      0,
      new Date().toISOString(),
      "",
      undefined,
      tokenPayload.id
    );

    const newPostDB = newPost.PostToDB();

    const response: string = await this.postDatabase.createPost(newPostDB);

    return response;
  };

  updatePost = async (input: UpdatePostInputDTO): Promise<string> => {
    const { token, id, content } = input;

    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotFoundError("Usuário inexistente.");
    }

    const userId = tokenPayload.id;

    const [postDB] = await this.postDatabase.findPostById(id);

    const post = new Post(
      postDB.id,
      postDB.content,
      postDB.likes,
      postDB.dislikes,
      postDB.created_at,
      new Date().toISOString(),
      undefined,
      userId
    );

    content && (post.CONTENT = content);

    const updatePostDB = post.PostToDB();

    const response = await this.postDatabase.editPost(updatePostDB, id);

    return response;
  };

  deletePost = async (postForDelete: DeletePostInputDTO): Promise<string> => {
    const { token, id } = postForDelete;

    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotFoundError("Usuário inexistente.");
    }

    await this.likesOrDislikeDatabase.deleteLikeOrDislike(id);

    const response: string = await this.postDatabase.deletePost(id);

    return response;
  };

  likeOrDislikeBusiness = async (postLikeOrDislike: likeOrDislikeInputDTO) => {
    const { token, id, like } = postLikeOrDislike;

    const tokenPayload = this.tokenManager.getPayload(token);

    if (!tokenPayload) {
      throw new NotFoundError("Usuário inexistente.");
    }

    const userId = tokenPayload.id;
    const postId = id;

    let response: string;

    const likeDB: number = !like ? 0 : 1;

    let newUserLikeOrDislikeDB: LikeOrDislikeDB = {
      user_id: userId,
      post_id: postId,
      like: likeDB,
    };

    const [postLikedExistDB] =
      await this.likesOrDislikeDatabase.findLikesAndDislikesById(userId);

    const [postDB] = await this.postDatabase.findPostById(postId);

    if (postDB.creator_id === userId) {
      throw new BadRequestError(
        "Não é possivel o criador dar dislike ou like no próprio post."
      );
    }

    if (!postLikedExistDB || postLikedExistDB.post_id !== postId) {
      let updatePost;

      if (!like) {
        updatePost = { ...postDB, dislikes: postDB.dislikes + 1 };
      } else {
        updatePost = { ...postDB, likes: postDB.likes + 1 };
      }

      await this.postDatabase.editPost(updatePost, postId);

      response = await this.likesOrDislikeDatabase.newLikesDislikes(
        newUserLikeOrDislikeDB
      );
    } else {
      let updatePost: PostDB | undefined;

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

      await this.postDatabase.editPost(updatePost, postId);

      response = await this.likesOrDislikeDatabase.updateLikeOrDislike(
        userId,
        postId,
        newUserLikeOrDislikeDB
      );
    }

    return response;
  };
}
