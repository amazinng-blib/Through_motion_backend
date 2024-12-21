import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      userID?: { id: string | number };
    }
  }
}
