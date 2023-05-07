import { BaseError } from "./BaseError";

export class NotFoundError extends BaseError {
  constructor(message = "Recurso invalido") {
    super(404, message);
  }
}
