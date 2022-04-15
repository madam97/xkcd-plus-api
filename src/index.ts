import express from 'express';
import 'dotenv/config';
import comicRouter from './routes/comic';

// App
const app = express();

// Init middleware
app.use(express.json());

// Routes
app.use('/comic', comicRouter);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));