var express = require('express');
var router = express.Router();
const DB = require('../utils/db');
const bcrypt = require('bcryptjs');

// 引入token
const { createToken } = require('../utils/token');
const timeFormat = require('../utils/time');


router.post('/login', async (req, res, next) => {
    await DB.getLocalHost().getConnection((err, conn) => {
        const { username, password } = req.body;
        const SQL = `select * from user_info where username = '${username}'`;
        conn.query(SQL, async (err, result) => {
            if (err) throw err;
            if (await result.length > 0) {
                const arr = Object.values(result);
                const isPwdValid = bcrypt.compareSync(password, arr[0].password);  // 使用bcrypt.compareSync验证密码
                if (!isPwdValid) {
                    res.send({
                        code: 404,
                        msg: "密码错误,请重新输入..."
                    })
                } else {
                    // 登录时间
                    const loginTime = timeFormat();
                    // 生成token
                    createToken(arr[0].username).then(result => {
                        const token = result;
                        res.send({
                            code: 200,
                            msg: "登录成功...",
                            data: {
                                token,
                                loginTime
                            }
                        })
                    }).catch(err => {
                        throw err;
                    })

                }
            } else {
                res.send({
                    code: 404,
                    msg: "用户名不存在,请重新输入..."
                })
                // 释放连接
                conn.release();
            }
        })
        if (err) throw err;
    })
})

module.exports = router;
