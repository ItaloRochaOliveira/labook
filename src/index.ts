import express, { Request, Response } from "express";
import cors from "cors";
import { postsRoute } from "./routes/postsRoute";
import { usersRoute } from "./routes/usersRoute";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => console.log("Servidor rodando na porta 3003"));

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send("pong");
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      res.status(400).send("erro");
    } else {
      res.status(500).send("erro inesperado");
    }
  }
});

app.use("/posts", postsRoute);
app.use("/users", usersRoute);
