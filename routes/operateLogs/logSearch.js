var express = require('express');
var router = express.Router();

const DB = require("../../utils/db");

// 引入时间插件
const timeFormat = require('../../utils/time');


// 查询全部表名
router.get('/AllSheetName', async (req, res, next) => {
    // 查询日志数据库中表数量
    const SQL_LOG = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'zclog'`;
    await DB.getRemoteHost_second().getConnection((err, connection) => {
        if (err) throw err;
        const timeStamp = timeFormat();
        connection.query(SQL_LOG, (err, result) => {
            if (err) res.json({
                code: 404,
                msg: "查询失败",
                time: timeStamp
            });
            // 将对象转化为数组
            const arr = Object.values(result);
            res.json({
                code: 200,
                msg: "数据库表名查询成功",
                data: arr,
                num: arr.length,
                time: timeStamp
            })
        })
        // 释放连接
        connection.release();
    })
})

// 日志分页查询
router.get("/operationLogSearch", async (req, res, next) => {

    // 入参
    const page = req.query.page || 1;  // 获取页码,默认为1
    const pageSize = req.query.pageSize || 50; // 获取每页记录,默认为50条
    const sheetName = req.query.sheetName; // 获取表名
    const offset = (page - 1) * pageSize;
    // SQL
    const SQL_COUNT = `SELECT COUNT(*) AS total FROM ${sheetName}`;
    const SQL = `SELECT * FROM ${sheetName} LIMIT ${offset}, ${pageSize} `;
    await DB.getRemoteHost_second().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL_COUNT, (err, results) => {
            if (err) res.json({
                code: 404,
                msg: "查询失败",
                time: timeFormat()
            })
            const total = results[0].total; // 总记录数
            const totalPages = Math.ceil(total / pageSize); // 总页数
            connection.query(SQL, (err, results) => {
                if (err) res.json({
                    code: 404,
                    msg: "查询失败",
                    time: timeFormat()
                })
                res.json({
                    code: 200,
                    msg: "查询成功",
                    // 当前页
                    page,
                    // 当前每页数量
                    pageSize,
                    // 总数
                    total,
                    // 总页数
                    totalPages,
                    // 返回值
                    data: results,
                    // 时间
                    time: timeFormat()
                })
            })
        })
        // 释放连接
        connection.release();
    })

})


module.exports = router;