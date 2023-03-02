const logger = require("../libs/logger.js");

const myAppConfig = {
    database : "ntask_api_v2",
    username : "root",
    password : "fungame",
    params : {
        dialect : "mysql",
        dialectModulePath : "mysql2",
        logging : (sql) => {
            logger.info(`[${new Date()}] ${sql}`);
        },
        define : {
            undescored : true
        }
    },
    jwtSecret : "NTa$k-AP1-vTwo",
    jwtSession : {session : false}
};

module.exports = myAppConfig;