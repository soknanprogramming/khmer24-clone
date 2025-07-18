import { Request } from "express";
import { User } from "../db/usersTable";

// Defines a request where the 'user' property is guaranteed to exist.
export interface AuthRequest extends Request {
  user: User;
}