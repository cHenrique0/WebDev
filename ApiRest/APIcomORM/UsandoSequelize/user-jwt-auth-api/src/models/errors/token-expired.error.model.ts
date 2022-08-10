import { JsonWebTokenError } from "jsonwebtoken";

export class TokenExpiredError extends JsonWebTokenError {
  constructor(public message: string, public error?: any) {
    super(message);
  }
}
