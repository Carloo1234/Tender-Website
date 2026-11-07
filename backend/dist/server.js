import express from 'express';
import { testConnection } from './db/db.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import helmet from 'helmet';
import cors from 'cors';
import { authMiddleware } from './middleware/authenticate.js';
import projectsRouter from "./modules/projects/projects.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;
// Mount Better Auth handler directly
app.all('/api/auth/{*splat}', toNodeHandler(auth));
app.use(express.json({ limit: "100kb" }));
// 1. Multi-layered Security Headers
app.use(helmet());
// 2. Enable Cross-Origin Resource Sharing
app.use(cors({
    origin: process.env.NODE_ENV === "production" ? process.env.FRONTEND_URL : "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get('/health', async (_req, res) => {
    const dbOk = await testConnection();
    res.json({
        status: 'ok',
        user: _req.user,
        session: _req.session,
        timestamp: new Date().toISOString(),
        database: dbOk ? 'connected' : 'disconnected'
    });
});
app.use("/projects", projectsRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
