import mysql2 from "mysql2";

module.exports = {
    database : "ntaskapi",
    username : "root",
    password : "fungame",
    params :{
        dialect : "mysql",
        dialectModulePath : "mysql2",
        host : "localhost",
        define : {
            undescored : true
        },
        logging : console.log
    }
};