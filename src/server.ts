import express, { Express } from "express";
import { router } from "./api/routes";
import cors from "cors";
import { NolanError } from "./api/error/NolanError";
import { ErrorMessage } from "./api/error/ErrorMessage";
import { ErrorCode } from "./api/error/ErrorCode";

const server: Express = express();
const port = 3333 || process.env.PORT;

const corsOptions = {
    origin: (origin: any, callback: any) => {
        if (!origin || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new NolanError(ErrorMessage.ORIGIN_NOT_ALLOWED, ErrorCode.ORIGIN_NOT_ALLOWED_CODE));
        }
    },
    optionsSuccessStatus: 200
};

server.use(express.json({ limit: '2mb' }));
server.use(cors(corsOptions));

router(server);

server.listen(port, () => {
    console.log("server listening on port " + port);
});


