var express = require('express');
var router = express.Router();
const DB = require('../utils/db');
const bcrypt = require('bcryptjs');


// 设置密码强度
const salt = bcrypt.genSaltSync(10);
/**
 *      
 *  新增用户(注册)
 */
router.post('/register', async (req, res, next) => {
    await DB.getLocalHost().getConnection((err, conn) => {
        // 定义前端传入数据
        const { username, password, phoneNumber } = req.body;
        // 生成hash值
        const hash = bcrypt.hashSync(password, salt);
        // sql
        const insertSql = `insert into user_info(username,password,phoneNumber) values('${username}','${hash}','${phoneNumber}') `;
        // 判断用户名的唯一性
        const isExistSql = `select * from user_info where username = '${username}'`;
        conn.query(isExistSql, (err, result) => {
            if (err) throw err;
            // 通过result的长度来判断用户名是否存在
            if (result.length > 0) {
                res.send({
                    code: 404,
                    msg: "用户已存在,创建失败...",
                })
                // 释放连接
                conn.release();
                return;
            } else {
                // 满足条件,新建用户
                conn.query(insertSql, (err, result) => {
                    if (err) throw err;
                    res.send({
                        code: 200,
                        msg: "新用户创建成功...",
                    })
                    // 释放连接
                    conn.release();
                    return;
                })
            }
        })
        // 抛出错误信息
        if (err) throw err;
    })
})


// other

module.exports = router;