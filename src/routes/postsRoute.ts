import express from "express";
import { PostController } from "../controller/PostController";
import { PostBusiness } from "../business/PostBusiness";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { LikesDislikesDatabase } from "../database/LikesDislikesDatabase";
import { TokenManager } from "../services/TokenManager";
import { IdGerator } from "../services/IdGerator";

export const postsRoute = express.Router();

const postController = new PostController(
  new PostBusiness(
    new PostDatabase(),
    new UserDatabase(),
    new LikesDislikesDatabase(),
    new TokenManager(),
    new IdGerator()
  )
);

postsRoute.get("/", postController.getAllPosts);
postsRoute.post("/", postController.createPost);
postsRoute.put("/:id", postController.editPosts);
postsRoute.put("/:id/like", postController.likesOrDislikes);
postsRoute.delete("/:id", postController.deletePost);
