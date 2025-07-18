import type { User } from "../db/usersTable";
import type { Request } from "express";


export interface AuthRequest extends Request {
    user: User;
}
  