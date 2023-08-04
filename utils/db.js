const mysql = require('mysql');

const DB = {
    // 本地默认地址
    getLocalHost() {
        // 默认数据库地址
        const pool = mysql.createPool({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "123456",
            database: "mesremodesystem",
            multipleStatements: true, //是否允许一个query中包含多条sql语句
        })

        // 判断是否连接成功
        pool.getConnection(async (err, connection) => {
            if (err) {
                console.log("数据库连接失败,错误信息为:" + err);
                return;
            }
            await console.log("localhost数据库连接成功...");
        })
        return pool;
    },
    // 远端服务地址
    getRemoteHost() {
        // 172.20.17.10参数配置
        const pool = mysql.createPool({
            host: "172.20.17.10",
            port: 3306,
            user: "guest002",
            password: "_123456_",
            database: "v03",
            multipleStatements: true,

        })

        // 测试是否连接成功

        pool.getConnection(async (err, connection) => {
            if (err) {
                console.log("172.20.17.10连接失败,错误信息为:" + err);
            }
            await console.log("172.20.17.10连接成功...");
        })
        return pool;
    },
    getRemoteHost_second() {
        const pool = mysql.createPool({
            host: "172.20.17.40",
            port: 3306,
            user: "root",
            password: "file123456",
            database: "zclog",
            multipleStatements: true
        })
        // 测试是否连接成功

        pool.getConnection(async (err, connection) => {
            if (err) {
                console.log("172.20.17.40连接失败,错误信息为:" + err);
            }
            await console.log("172.20.17.40连接成功...");
        })
        return pool;
    }
}


module.exports = DB;