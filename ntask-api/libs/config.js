module.exports = {
    database : "ntaskapi",
    username : "springuser",
    password : "spring",
    params : {
        dialect : "mysql",
        dialectModulePath : "mysql2",
        logging : console.log,
        define : {
            undescored : true
        }
    }
};