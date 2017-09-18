import {IncomingMessage, ServerResponse} from "http";

import {DoctorDB} from "../persistence/DoctorDB";
import {AuthDB} from "../persistence/AuthDB";
import {DoctorModel} from "../models/DoctorModel";

import {TokenParser} from "../helpers/TokenParser";


export class DoctorRoute {

    public static getAll(request: IncomingMessage, response: ServerResponse, data: object): void {
        let postData: object = data;
        let statusCode: number = 500;

        Promise.resolve()
                .then(() => {
                    return AuthDB.getOne(TokenParser.getToken(request))
                        .then((data: any) => {
                            if (!data.length) {
                                statusCode = 401;
                                return Promise.reject(new Error("access denied"));
                            }
                            return Promise.resolve(data);
                        })
                        .catch((error: Error) => {
                            statusCode = 401;
                            return Promise.reject(new Error("access denied"));
                        });
                })
                .then(() => {
                    return DoctorDB.getAll();
                })
                .then((data: any) => {
                    let result = {
                        success: true
                    };
                    result[postData["class"]] = data;

                    response.statusCode = 200;
                    response.write(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    let resultError: any = {
                        error: error.message,
                        errspec: data
                    };

                    response.statusCode = statusCode;
                    response.write(JSON.stringify(resultError));
                })
                .then(() => {
                    response.end();
                });
    }

    public static getOne(request: IncomingMessage, response: ServerResponse, data: object): void {
        let postData: object = data;
        let statusCode: number = 500;

        Promise.resolve()
                .then(() => {
                    return AuthDB.getOne(TokenParser.getToken(request))
                        .then((data: any) => {
                            if (!data.length) {
                                statusCode = 401;
                                return Promise.reject(new Error("access denied"));
                            }
                            return Promise.resolve(data);
                        })
                        .catch((error: Error) => {
                            statusCode = 401;
                            return Promise.reject(new Error("access denied"));
                        });
                })
                .then(() => {
                    if (data["lanr"].length !== 9) {
                        return Promise.reject(new Error("Invalid lanr number"));
                    }
                    return DoctorDB.getOne(data["lanr"]);
                })
                .then((data: any) => {
                    let result = {
                        success: true
                    };
                    result[postData["class"]] = data;

                    response.statusCode = 200;
                    response.write(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    let resultError: any = {
                        error: error.message,
                        errspec: data
                    };

                    response.statusCode = statusCode;
                    response.write(JSON.stringify(resultError));
                })
                .then(() => {
                    response.end();
                });
    }

    public static saveOne(request: IncomingMessage, response: ServerResponse, data: object): void {
        let postData: object = data;
        let doctorModel: DoctorModel = new DoctorModel(data);
        let statusCode: number = 500;

        Promise.resolve()
                .then(() => {
                    return AuthDB.getOne(TokenParser.getToken(request))
                        .then((data: any) => {
                            if (!data.length) {
                                statusCode = 401;
                                return Promise.reject(new Error("access denied"));
                            }
                            return Promise.resolve(data);
                        })
                        .catch((error: Error) => {
                            statusCode = 401;
                            return Promise.reject(new Error("access denied"));
                        });
                })
                .then(() => {
                    return DoctorDB.saveOne(new DoctorModel(postData));
                })
                .then((data: any) => {
                    let result = {
                        success: true
                    };
                    result[postData["class"]] = doctorModel;

                    response.statusCode = 200;
                    response.write(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    let resultError: any = {
                        error: error.message,
                        errspec: data
                    };

                    response.statusCode = statusCode;
                    response.write(JSON.stringify(resultError));
                })
                .then(() => {
                    response.end();
                });
    }

    public static saveAll(request: IncomingMessage, response: ServerResponse, data: object): void {
        const collection: Array<DoctorModel> = data["data"];
        let statusCode: number = 500;

        Promise.resolve()
                .then(() => {
                    return AuthDB.getOne(TokenParser.getToken(request))
                        .then((data: any) => {
                            if (!data.length) {
                                statusCode = 401;
                                return Promise.reject(new Error("access denied"));
                            }
                            return Promise.resolve(data);
                        })
                        .catch((error: Error) => {
                            statusCode = 401;
                            return Promise.reject(new Error("access denied"));
                        });
                })
                .then(() => {
                    return DoctorDB.saveAll(collection);
                })
                .then(() => {
                    let result = {
                        success: true
                    };
                    result[data["class"]] = collection;

                    response.statusCode = 200;
                    response.write(JSON.stringify(result));
                })
                .catch((error: Error) => {
                    let resultError: any = {
                        error: error.message,
                        errspec: collection
                    };

                    response.statusCode = statusCode;
                    response.write(JSON.stringify(resultError));
                })
                .then(() => {
                    response.end();
                });
    }
}
