import express, { Express } from "express";
import { router } from "./api/routes";

const server: Express = express();
const port = 3333 || process.env.PORT;

server.use(express.json());

router(server);

server.listen(port, () => {
    console.log("server listening on port " + port);
});
