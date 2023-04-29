import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";

export class PostController {
  constructor(private postBusiness: PostBusiness) {}

  getAllPosts = async (req: Request, res: Response) => {
    // const headers = req.headers.authorization;

    try {
      const posts = await this.postBusiness.getPosts();

      res.status(200).send(posts);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(400).send("erro");
      } else {
        res.status(500).send("erro inesperado");
      }
    }
  };

  createPost = async (req: Request, res: Response) => {
    // const headers = req.headers.authorization;

    try {
      const { content } = req.body;
      const result = await this.postBusiness.createPost(content);

      res.status(200).send(result);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(400).send("erro");
      } else {
        res.status(500).send("erro inesperado");
      }
    }
  };
}
