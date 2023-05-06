import express from "express";
import { UserController } from "../controller/UserController";
import { userBusiness } from "../business/UsersBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { IdGerator } from "../services/IdGerator";

export const usersRoute = express.Router();

const userController = new UserController(
  new userBusiness(
    new UserDatabase(),
    new IdGerator(),
    new HashManager(),
    new TokenManager()
  )
);

usersRoute.post("/signup", userController.signup);
usersRoute.post("/login", userController.login);
