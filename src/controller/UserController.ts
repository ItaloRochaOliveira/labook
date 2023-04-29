import { Request, Response } from "express";
import { userBusiness } from "../business/UsersBusiness";

export class UserController {
  constructor(private userBusiness: userBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const newUser = req.body;

      const token = await this.userBusiness.signup(newUser);

      res.status(200).send({
        message: "user criado com sucesso",
        token,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof Error) {
        res.status(400).send("erro");
      } else {
        res.status(500).send("erro inesperado");
      }
    }
  };

  login = async (req: Request, res: Response) => {
    try {
      const user = req.body;

      const token = await this.userBusiness.login(user);

      res.status(200).send(token);
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
