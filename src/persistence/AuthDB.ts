import {Collection, InsertOneWriteOpResult, InsertWriteOpResult} from "mongodb";

import {DatabaseManager} from "../helpers/DatabaseManager";
import {AuthModel} from "../models/AuthModel";

export class AuthDB {
    public static getOne(token: string): Promise<Array<any>|Error> {
        return DatabaseManager.getInstance().getCollection("auth")
            .then((collection: Collection) => {
                return collection.find({"token": token}).toArray();
            });
    }

    public static saveOne(auth: AuthModel): Promise<InsertOneWriteOpResult> {
        return DatabaseManager.getInstance().getCollection("auth")
            .then((collection: Collection) => {
                return new Promise((resolve, reject) => {
                    collection.createIndexes([{key: {"createdAt": 1}, expireAfterSeconds: 3600}, {key: {"token": 1}, unique: true}])
                        .then(() => {
                            return resolve(collection.insertOne(auth.toJSON()));
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            });
    }

    public static deleteOne(token: AuthModel): Promise<InsertOneWriteOpResult> {
        return DatabaseManager.getInstance().getCollection("auth")
            .then((collection: Collection) => {
                return collection.deleteOne({"token": token});
            });
    }
}
