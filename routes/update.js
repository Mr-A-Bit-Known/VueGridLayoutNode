var express = require('express');
var router = express.Router();
var pool = require('../utils/db');
var bcrypt = require('bcryptjs');


// 设置密码强度

const salt = bcrypt.genSaltSync(10);


router.post('/passwordInitialize', async (req, res, next) => {
    await pool.getConnection((err, connection) => {
        // 定义前端传入数据
        const { password } = req.body;

        // 生成hash值
        const hash = bcrypt.hashSync(password, salt);

        // SQL
    })
    // 释放连接
    connection.release();
})