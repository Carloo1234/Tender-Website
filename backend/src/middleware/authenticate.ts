import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import type { Request, Response, NextFunction } from "express";
import type { User, Session } from 'better-auth';

type AuthenticatedRequest = Request & {
  user: User;
  session: Session;
};

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const session = await auth.api.getSession({headers: fromNodeHeaders(req.headers)})

        if (!session?.user || !session.session){
            return res.send("Unauthenticated")
        }
        
        req.user = session.user;
        req.session = session.session;
        next()
    } catch (error){
        next(error)
    }
}