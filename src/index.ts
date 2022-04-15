import express from 'express';
import 'dotenv/config';

// App
const app = express();

// Init middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));