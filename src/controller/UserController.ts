import { Request, Response } from "express";
import { userBusiness } from "../business/UsersBusiness";
import { SignupScheme } from "../dtos/userDTO/signup.dto";
import { loginScheme } from "../dtos/userDTO/login.dto";

export class UserController {
  constructor(private userBusiness: userBusiness) {}

  signup = async (req: Request, res: Response) => {
    try {
      const newUser = SignupScheme.parse({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

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
      const user = loginScheme.parse({
        email: req.body.email,
        password: req.body.password,
      });

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
