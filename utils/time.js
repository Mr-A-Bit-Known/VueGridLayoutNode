/**
 * 
 * @returns 
 * 
 * 通用时间格式化方法
 */

const timeFormat = () => {
    // 获取当前时间
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    // 格式化时间
    // 数字个位时,首位加0-(月份)
    if (month.toString().length < 2) {
        month = "0" + month;
    }
    // 数字个位时,首位加0-(当日)
    if (day.toString().length < 2) {
        day = "0" + day;
    }
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    // 数字个位时,首位加0-(时)
    if (hour.toString().length < 2) {
        hour = "0" + hour;
    }
    // 数字个位时,首位加0-(分)
    if (minutes.toString().length < 2) {
        minutes = "0" + minutes;
    }
    // 数字个位时,首位加0-(秒)
    if (seconds.toString().length < 2) {
        seconds = "0" + seconds;
    }
    var time = hour + ":" + minutes + ":" + seconds;
    // 返回格式化后的时间
    return year + "-" + month + "-" + day + " " + time;
}

module.exports = timeFormat;