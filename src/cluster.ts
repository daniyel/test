import * as cluster from "cluster";
import * as os from "os";

if (cluster.isMaster) {
    const cpus = os.cpus().length;

    console.log(`Forking for ${cpus} CPUs`);

    for (let cpu = 0; cpu < cpus; cpu++) {
        cluster.fork();
    }
} else {
    require("./index");
}
