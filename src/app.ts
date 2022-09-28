import express from "express";
import { cors } from "./services/middleware/cors";
import { router } from "./services/router";

const app = express();

app.use(cors);
app.use(express.json());
app.use(router);

export default app;