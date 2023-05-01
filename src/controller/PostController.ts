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

  editPosts = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { content } = req.body;

      const response = await this.postBusiness.updatePost(content, id);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(400).send("erro");
      } else {
        res.status(500).send("erro inesperado");
      }
    }
  };

  deletePost = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;

      const response = await this.postBusiness.deletePost(id);

      res.status(200).send(response);
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(400).send("erro");
      } else {
        res.status(500).send("erro inesperado");
      }
    }
  };

  likesOrDislikes = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { idUser, like } = req.body;

      console.log(id, idUser, like);
      const response = await this.postBusiness.likeOrDislikeBusiness(
        id,
        idUser,
        like
      );

      res.status(200).send(response);
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
