import {IncomingMessage, ServerResponse} from "http";

import {DoctorRoute} from "./routes/DoctorRoute";
import {AuthRoute} from "./routes/AuthRoute";

export class Router {
    private static _instance: Router = new Router();

    private constructor() {
        if (Router._instance) {
            throw new Error("Error: instantiation failed: Use Router.getInstance() instead of new.");
        }
        Router._instance = this;
    }

    public static getInstance(): Router {
        return Router._instance;
    }

    handle(request: IncomingMessage, response: ServerResponse, pathname: string, data: string): void {
        let postData: any;

        if (request.method !== "POST" || (pathname !== "/" && pathname !== "")) {
            response.writeHead(501, {"Content-Type": "text/plain"});
            response.end("not implemented yet");
        } else {
            response.setHeader("Content-Type", "application/json");

            try {
                postData = JSON.parse(data);
            } catch (e) {
                let error: Error = e,
                    resultError: any = {
                        error: error.message,
                        errspec: data
                    };

                response.statusCode = 400;
                response.end(JSON.stringify(resultError));
                return;
            }
        }

        if (postData.class === "doctor" && DoctorRoute[postData.method]) {
            DoctorRoute[postData.method](request, response, postData);
        }

        if (postData.class === "auth" && AuthRoute[postData.method]) {
            AuthRoute[postData.method](request, response, postData);
        }
    }
}
