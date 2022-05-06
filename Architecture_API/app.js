import 'dotenv/config'
import express from 'express';
import helmet from "helmet";
import cors from 'cors';

import api from './src/routes/api';

const app = express();
const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", api);

app.listen(PORT, () => console.log('The server is listening on port 3000'));