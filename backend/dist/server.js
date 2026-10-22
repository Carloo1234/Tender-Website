import express from 'express';
import { testConnection } from './db.js';
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
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default app;
