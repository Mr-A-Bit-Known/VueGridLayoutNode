const jwt = require('jsonwebtoken');

// 数字签名
const screct = "SpongeBob";


// 生成token
const createToken = (data) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ data }, screct, {
            expiresIn: "1h"  // 过期时间设置为一小时
        })
        resolve(token)
    })
}

//验证token
const varifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.varifyToken(token, screct, (error, decoded) => {
            if (error) {
                reject(error);
            } else {
                resolve(decoded);
            }
        })
    })
}

module.exports = { createToken, varifyToken };





