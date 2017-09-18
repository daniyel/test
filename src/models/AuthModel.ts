import * as crypto from "crypto";
import {v1} from "uuid";

export class AuthModel {
    public token: string;
    public hash: string;
    public createdAt: Date;

    constructor(data) {
        console.log(data);
        this.setCreatedAt();
        this.setToken();
        this.setHash(data.username + data.password);
    }

    public setToken(): void {
        this.token = v1();
    }

    public getToken(): string {
        return this.token;
    }

    public setHash(value: string): void {
        this.hash = crypto.createHash("md5").update(value).digest("hex");
    }

    public getHash(): string {
        return this.hash;
    }

    public setCreatedAt(): void {
        this.createdAt = new Date();
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public toJSON(): object {
        return {
            token: this.token,
            hash: this.hash,
            createdAt: this.createdAt
        };
    }
}
