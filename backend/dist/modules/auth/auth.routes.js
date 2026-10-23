import { toNodeHandler } from 'better-auth/node';
import { auth } from '../../lib/auth.js';
import { Router } from 'express';
const authRouter = Router();
// Test route to verify router is mounted
authRouter.get('/test', (req, res) => {
    res.json({ ok: true, message: 'Auth router working' });
});
const handler = toNodeHandler(auth);
authRouter.all('/{*splat}', (req, res) => {
    return handler(req, res);
});
export default authRouter;
