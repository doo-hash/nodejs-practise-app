import mysql2 from "mysql2";

module.exports = {
    database : "ntask",
    username : "root",
    password : "fungame",
    params :{
        dialect : "mysql",
        dialectModule : "mysql2",
        host : "localhost",
        define : {
            undescored : true
        },
        logging : console.log
    }
};