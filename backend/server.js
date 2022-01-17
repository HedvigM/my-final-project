import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/session';
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`);
});
