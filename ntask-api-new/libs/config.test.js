module.exports = {
    database : "ntask",
    username : "root",
    password : "fungame",
    params : {
        dialect : "mysql",
        dialectModulePath : "mysql2",
        logging : false,
        define : {
            undescored : true
        }
    },
    jwtSecret : "NTa$k-AP1",
    jwtSession : {session : false}
};