import express from "express";
import { UserController } from "../controller/UserController";
import { userBusiness } from "../business/UsersBusiness";
import { UserDatabase } from "../database/UserDatabase";

export const usersRoute = express.Router();

const userController = new UserController(new userBusiness(new UserDatabase()));

usersRoute.post("/signup", userController.signup);
usersRoute.post("/login", userController.login);
