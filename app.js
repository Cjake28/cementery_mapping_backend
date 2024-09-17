import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';

dotenv.config();

export const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hellow World");
});

app.use("/api/auth", authRoutes);