import {exit, pid} from "process";
import {IncomingMessage, ServerResponse} from "http";

import {DragonServer} from "./DragonServer";
import {DatabaseManager} from "./helpers/DatabaseManager";
import {Router} from "./Router";

console.info("=== Starting DragonServer ===");

DragonServer.getInstance()
    .start((request: IncomingMessage, response: ServerResponse, pathname: string, data: string) => {
        Router.getInstance().handle(request, response, pathname, data);
    })
    .then(() => {
        console.log("=== Finished DragonServer start ===");
        console.log("Started process", pid);

        return DatabaseManager.getInstance().connect();
    })
    .then(() => {
        console.log("--- Connection to MongoDB established ---");
    })
    .catch((error: Error) => {
        console.error("An error occured during server start", error);
        exit(1);
    });
