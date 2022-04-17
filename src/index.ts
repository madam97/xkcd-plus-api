import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import comicRouter from './routes/comics';

// App
const app = express();

// Init middleware
app.use(cors({
  origin: process.env.UI_BASE_URL ?? '*'
}));
app.use(express.json());

// Routes
app.use('/comics', comicRouter);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));