import express from 'express';
import { testConnection } from './db/db.js';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.get('/health', async (_req, res) => {
    const dbOk = await testConnection();
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: dbOk ? 'connected' : 'disconnected'
    });
});
// Mount Better Auth handler directly
app.all('/api/auth/{*splat}', toNodeHandler(auth));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
