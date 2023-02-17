const myAppConfig = {
    database : "ntask_api_v2",
    username : "root",
    password : "fungame",
    params : {
        dialect : "mysql",
        dialectModulePath : "mysql2",
//        logging : console.log,
        define : {
            undescored : true
        }
    },
    jwtSecret : "NTa$k-AP1-vTwo",
    jwtSession : {session : false}
};

module.exports = myAppConfig;