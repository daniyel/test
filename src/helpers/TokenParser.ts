import {IncomingMessage} from "http";

export class TokenParser {
    public static getToken(request: IncomingMessage): string {
        let authorization: string;
        let token: string = "";

        if (request.headers["authorization"]) {
            authorization = request.headers["authorization"].toString();
        }

        if (authorization) {
            token = authorization.split(" ")[1];
        }
        return token;
    }
}
