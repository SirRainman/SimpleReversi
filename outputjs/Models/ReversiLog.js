"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
// import * as log4js from 'log4js'
var ReversiLog = /** @class */ (function () {
    function ReversiLog() {
    }
    ReversiLog.prototype.formatDate = function () {
        var Dates = new Date();
        var Year = Dates.getFullYear();
        var Months = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        var Day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        var Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
        var Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
        var Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
        return Year + Months + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
    };
    ReversiLog.prototype.logGenerator = function (time, size, resultCount) {
        // log4js.configure({
        //     appenders: {
        //         everything: { type: 'file', filename: 'test.csv', layout: { type: 'messagePassThrough' } }
        //     },
        //     categories: {
        //         default: { appenders: ['everything'], level: 'info' }
        //     }
        // });
        // const logger = log4js.getLogger();
        // const fs = require("js")
        var str = [];
        str.push(this.formatDate());
        str.push((time / 1000).toString());
        str.push(size + "*" + size);
        str.push(resultCount.blackCount > resultCount.whiteCount ? "黑手" : "白手");
        str.push(resultCount.blackCount < resultCount.whiteCount ? "黑手" : "白手");
        fs.writeFileSync('Reversi.csv', str.join(",") + '\n', { flag: 'a' });
    };
    return ReversiLog;
}());
