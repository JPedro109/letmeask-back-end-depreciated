import { PORT } from "./config";
import express from "express";
import app from "./app";

const server = express();

server.use(app);
server.listen(PORT, () => console.log(`Server is Running in port ${PORT}`));