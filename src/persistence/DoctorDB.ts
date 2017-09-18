import {Collection, InsertOneWriteOpResult, InsertWriteOpResult} from "mongodb";

import {DatabaseManager} from "../helpers/DatabaseManager";
import {DoctorModel} from "../models/DoctorModel";

export class DoctorDB {

    public static getAll(): Promise<Array<any>|Error> {
        return DatabaseManager.getInstance().getCollection("doctor")
            .then((collection: Collection) => {
                return collection.find().toArray();
            });
    }

    public static getOne(lanr: string): Promise<Array<any>|Error> {
        return DatabaseManager.getInstance().getCollection("doctor")
            .then((collection: Collection) => {
                return collection.find({lanr: lanr}).toArray();
            });
    }

    public static saveOne(doctor: DoctorModel): Promise<InsertOneWriteOpResult> {
        return DatabaseManager.getInstance().getCollection("doctor")
            .then((collection: Collection) => {
                return new Promise((resolve, reject) => {
                    collection.createIndex("lanr", {unique: true})
                        .then(() => {
                            resolve(collection.insertOne(doctor.toJSON()));
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            });
    }

    public static saveAll(doctors: Array<DoctorModel>): Promise<InsertWriteOpResult> {
        return DatabaseManager.getInstance().getCollection("doctor")
            .then((collection: Collection) => {
                return new Promise((resolve, reject) => {
                    collection.createIndex("lanr", {unique: true})
                        .then(() => {
                            resolve(collection.insertMany(doctors));
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
            });
    }
}
