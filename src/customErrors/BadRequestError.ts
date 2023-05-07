import { BaseError } from "./BaseError";

export class BadRequestError extends BaseError {
  constructor(message = "requisição invalida") {
    super(400, message);
  }
}
