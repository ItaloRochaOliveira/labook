import { PostDatabase } from "../database/PostDatabase";

export class PostBusiness {
  constructor(private postDatabase: PostDatabase) {}

  getPosts = async (params: any) => {};
}
