interface CreatorObj {
  id: string;
  name: string;
}

export class Post {
  constructor(
    private id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creator: CreatorObj
  ) {}

  public get ID(): string {
    return this.id;
  }

  public get CONTENT(): string {
    return this.content;
  }

  public get LIKES(): number {
    return this.likes;
  }

  public get DISLIKES(): number {
    return this.dislikes;
  }

  public get CREATEDAT(): string {
    return this.createdAt;
  }

  public get UPDATEDAT(): string {
    return this.updatedAt;
  }

  public get CREATOR(): CreatorObj {
    return this.creator;
  }

  public set ID(newId: string) {
    this.id = newId;
  }

  public set CONTENT(newContent: string) {
    this.content = newContent;
  }

  public set LIKES(newLikes: number) {
    this.likes = newLikes;
  }

  public set DISLIKES(newDislikes: number) {
    this.dislikes = newDislikes;
  }

  public set CREATEDAT(newCreatedAt: string) {
    this.createdAt = newCreatedAt;
  }

  public set UPDATEDAT(newUpdateAt: string) {
    this.updatedAt = newUpdateAt;
  }

  public set CREATOR(newCreator: CreatorObj) {
    this.creator = newCreator;
  }
}
