import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

import { app } from './app.js';
const DB = process.env.CONNECTION_URL;
const port = process.env.PORT || 5000;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((conn) => console.log(`DB connected`))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
