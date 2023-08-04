var express = require('express');
var router = express.Router();
const DB = require('../utils/db');

// 引入树形结构转换方法
const listToTree = require('../utils/tree');


// 依据用户名查询
router.post('/search', async (req, res, next) => {
    await DB.getLocalHost().getConnection((err, conn) => {
        const { username } = req.body;
        const SQL = `select * from user_info where username = '${username}'`;
        conn.query(SQL, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    code: 200,
                    msg: "查询成功...",
                    data: result
                })
            } else {
                res.send({
                    code: 404,
                    msg: "查询失败..."
                })
            }
            // 释放连接
            conn.release();
        })
        if (err) throw err;
    })
})

// 在制品报表查询(172.20.17.10) (加载前50条)

router.post('/show-plugin-batch-display', async (req, res, next) => {
    const SQL = `select * from v_station_batch_display_data LIMIT 50`;
    await DB.getRemoteHost().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL, (err, result) => {
            if (err) throw err;
            res.send({
                code: 200,
                msg: "查询成功...",
                data: result,
            })
        })
        // 释放连接
        connection.release();

    })
})

// 在制品报表查询所有(172.20.17.10)
router.post('/showAll-plugin-batch-display', async (req, res, next) => {
    const SQL = `select * from v_station_batch_display_data where 组装批 IS NOT NULL`;
    await DB.getRemoteHost().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL, (err, result) => {
            if (err) throw err;
            res.send({
                code: 200,
                msg: "查询成功...",
                data: result
            })
        })
        // 释放连接
        connection.release();
    })

})

// 查询所有用户信息(localhost)
router.post('/show_user_list_display', async (req, res, next) => {
    const SQL = `SELECT * FROM user_info WHERE id IS NOT NULL`;
    await DB.getLocalHost().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL, (err, result) => {
            if (err) throw err;
            res.send({
                code: 200,
                msg: "查询成功...",
                data: result
            })
        })
        // 释放连接
        connection.release();
    })
})


// 主面板菜单获取(导航菜单)

router.post('/show_list_display', async (req, res, next) => {
    const SQL = `SELECT * FROM table_list_display WHERE ID IS NOT NULL`;
    await DB.getLocalHost().getConnection((err, connection) => {
        if (err) throw err;
        connection.query(SQL, (err, result) => {
            if (err) throw err;
            // 调用树形结构通用方法
            const arr = listToTree(result, null, []);
            res.send({
                code: 200,
                msg: "查询成功...",
                ps: '导航菜单',
                data: arr
            })
        })
        // 释放连接
        connection.release();
    })
})

module.exports = router; 