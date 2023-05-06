import { Request, Response } from "express";
import { userBusiness } from "../business/UsersBusiness";

export class UserController {
  constructor(private userBusiness: userBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const newUser = req.body;

      const response = await this.userBusiness.signup(newUser);

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

  login = async (req: Request, res: Response) => {
    try {
      const user = req.body;

      const response = await this.userBusiness.login(user);

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
