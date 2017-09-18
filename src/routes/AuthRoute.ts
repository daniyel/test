import {IncomingMessage, ServerResponse} from "http";

import {AuthDB} from "../persistence/AuthDB";
import {AuthModel} from "../models/AuthModel";

export class AuthRoute {
    public static login(request: IncomingMessage, response: ServerResponse, data: object): void {
        let postData: object = data;
        let authModel: AuthModel;
        Promise.resolve()
                .then(() => {
                    if (!postData["username"] || !postData["password"]) {
                        return Promise.reject(new Error("Missing username, password or both"));
                    }
                    authModel = new AuthModel(postData);
                    return AuthDB.saveOne(authModel);
                })
                .then((data: any) => {
                    let result = {
                        success: true
                    };
                    result[postData["class"]] = authModel.getToken();

                    response.statusCode = 200;
                    response.write(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    let resultError: any = {
                        error: error.message,
                        errspec: data
                    };

                    response.statusCode = 500;
                    response.write(JSON.stringify(resultError));
                })
                .then(() => {
                    response.end();
                });
    }

    public static logout(request: IncomingMessage, response: ServerResponse, data: object): void {
        let postData: object = data;
        Promise.resolve()
                .then(() => {
                    if (!postData["token"]) {
                        return Promise.reject(new Error("Missing token"));
                    }
                    return AuthDB.deleteOne(postData["token"]);
                })
                .then((data: any) => {
                    let result = {
                        success: true
                    };
                    result[postData["class"]] = postData["token"];

                    response.statusCode = 200;
                    response.write(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    let resultError: any = {
                        error: error.message,
                        errspec: data
                    };

                    response.statusCode = 500;
                    response.write(JSON.stringify(resultError));
                })
                .then(() => {
                    response.end();
                });
    }
}
