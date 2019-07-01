import express from 'express';
import { config } from 'dotenv';

const app = express();

config();

const port = process.env.PORT;


app.listen(port);
