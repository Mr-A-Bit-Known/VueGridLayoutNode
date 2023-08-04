var express = require('express');
var router = express.Router();

const DB = require("../../utils/db");

// 引入时间插件
const timeFormat = require('../../utils/time')

// wipReport(分页查询)

router.get("/wipReportPagesSearch", async (req, res, next) => {

    // 入参
    const page = req.query.page || 1;  // 获取页码,默认为1
    const pageSize = req.query.pageSize || 50; // 获取每页记录,默认为50条
    const offset = (page - 1) * pageSize;

    // SQL

    const SQL_COUNT = `SELECT COUNT(*) AS total FROM v_station_batch_display_data`;
    const SQL = `SELECT * FROM v_station_batch_display_data LIMIT ${offset}, ${pageSize} `;
    await DB.getRemoteHost().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL_COUNT, (err, results) => {
            if (err) throw err;
            const total = results[0].total; // 总记录数
            const totalPages = Math.ceil(total / pageSize); // 总页数
            connection.query(SQL, (err, results) => {
                if (err) throw err;
                const searchTime = timeFormat();
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
                    searchTime
                })
            })
        })
        // 释放连接
        connection.release();
    })

})


module.exports = router;