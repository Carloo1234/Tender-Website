import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
export async function authMiddleware(req, res, next) {
    try {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        if (!session?.user || !session.session) {
            return res.send("Unauthenticated");
        }
        req.user = session.user;
        req.session = session.session;
        next();
    }
    catch (error) {
        next(error);
    }
}
