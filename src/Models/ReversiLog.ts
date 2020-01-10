import * as fs from "fs";

// import * as log4js from 'log4js'
class ReversiLog {
    public formatDate() {
        const Dates = new Date();
        const Year: number = Dates.getFullYear();
        const Months: any = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1);
        const Day: any = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate();
        const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours();
        const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes();
        const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds();
        return Year + Months + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
    }

    public logGenerator(time: number, size: number, resultCount: PlayerChessCount) {

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

        let str: string[] = [];
        str.push(this.formatDate());
        str.push((time / 1000).toString());
        str.push(size + "*" + size);
        str.push(resultCount.blackCount > resultCount.whiteCount ? "黑手" : "白手")
        str.push(resultCount.blackCount < resultCount.whiteCount ? "黑手" : "白手")
        fs.writeFileSync('Reversi.csv', str.join(",") + '\n', { flag: 'a' });
    }
}