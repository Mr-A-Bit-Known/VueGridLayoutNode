var express = require('express');
var router = express.Router();


const DB = require("../../utils/db");

// 时间插件
const timeFormat = require("../../utils/time");



// 按条件查询(日志)

router.get("/OperationLogsUsers", async (req, res, next) => {

    // 入参

    const page = req.query.page || 1;  // 页码,默认为1
    const pageSize = req.query.pageSize || 25;  // 每页展示条数,默认为25
    //  偏移量(从第几条开始展示)
    const offset = (page - 1) * pageSize;

    // 获取表名
    const sheetName = req.query.sheetName;

    // 查询条件
    const UserName = req.query.UserName;  // 操作人姓名
    const BtnName = req.query.BtnName;  // 操作按钮名称
    const MenuName = req.query.MenuName; // 操作菜单名称


    // 查询条件数组
    const SQL_OPRIONS = [];
    if (UserName !== "" && UserName !== undefined) {
        const SQL_options_first = ` AND UserName = '${UserName}'`;
        SQL_OPRIONS.push(SQL_options_first);
    }
    if (BtnName !== "" && BtnName !== undefined) {
        const SQL_options_first = ` AND BtnName = '${BtnName}'`;
        SQL_OPRIONS.push(SQL_options_first);
    }
    if (MenuName !== "" && MenuName !== undefined) {
        const SQL_options_first = ` AND MenuName = '${MenuName}'`;
        SQL_OPRIONS.push(SQL_options_first);
    }


    // 去除数组中逗号(防止SQL语句错误)
    const SQL_OPRIONS_Repeat = SQL_OPRIONS.join("");
    // SQL 
    const SQL = `SELECT * FROM ${sheetName} WHERE 1=1 ${SQL_OPRIONS_Repeat} LIMIT ${offset},${pageSize}`


    // 查询
    await DB.getRemoteHost_second().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL, (err, results) => {
            console.log(SQL);
            if (err) res.json({
                code: 404,
                msg: "查询失败",
                time: timeFormat()
            })
            const total = results.length; // 总记录数
            const totalPages = Math.ceil(total / pageSize); // 总页数
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
        // 释放连接
        connection.release();
    })
})

module.exports = router;