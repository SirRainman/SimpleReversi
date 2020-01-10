System.register(["log4js"], function (exports_1, context_1) {
    "use strict";
    var log4js;
    var __moduleName = context_1 && context_1.id;
    //一局下完以后需要ctrl+c结束程序
    //然后重新运行程序才能下第二局
    //不存在连锁反转的情况，因为如果存在就会死锁。
    function letter_to_number(letter) {
        var dict = {
            'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5, 'f': 6, 'g': 7, 'h': 8, 'i': 9, 'j': 10, 'k': 11, 'l': 12, 'm': 13, 'n': 14, 'o': 15, 'p': 16, 'q': 17, 'r': 18, 's': 19, 't': 20, 'u': 21, 'v': 22, 'w': 23, 'x': 24, 'y': 25, 'z': 26,
        };
        return letter.trim().split('').map(function (k) {
            return dict[k];
        });
    }
    function number_to_letter(num) {
        var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
        return num.trim().split(',').map(function (k) {
            return alphabet[Number(k) - 1];
        }).join();
    }
    function get_time() {
        var Dates = new Date();
        var Year = Dates.getFullYear(); //年份
        var Months = (Dates.getMonth() + 1) < 10 ? '0' + (Dates.getMonth() + 1) : (Dates.getMonth() + 1); //月份
        var Day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate(); //具体的天数
        var Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours(); //小时
        var Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes(); //分钟
        var Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds(); //秒
        return (Year + '' + Months + '' + Day + ' ' + Hours + ':' + Minutes + ':' + Seconds); //返回数据格式
    }
    function logPrinter(begin, end, reversiboard, computer_item) {
        log4js.configure({
            appenders: {
                everything: { type: 'file', filename: 'test.csv', layout: { type: 'messagePassThrough' } }
            },
            categories: {
                default: { appenders: ['everything'], level: 'info' }
            }
        });
        var logger = log4js.getLogger();
        var spendTime = 3600 * (Number(end[9] + end[10]) - Number(begin[9] + begin[10])) + 60 * (Number(end[12] + end[13]) - Number(begin[12] + begin[13])) + Number(end[15] + end[16]) - Number(begin[15] + begin[16]);
        var message = begin.concat(",").concat(end.toString()).concat(',').concat(spendTime.toString()).concat(",").concat(reversiboard.toString() + "*" + reversiboard.toString()).concat((computer_item == 'x') ? (",computer,human") : (",human,computer"));
        logger.info(message);
    }
    function init(reversiboard) {
        var temp = Array.from({ length: reversiboard }).fill('0'); //生成数组
        var reversi = temp.map(function (x) { return Array.from({ length: reversiboard }).fill('.'); });
        reversi[reversiboard / 2][reversiboard / 2] = 'o';
        reversi[reversiboard / 2 - 1][reversiboard / 2 - 1] = 'o';
        reversi[reversiboard / 2 - 1][reversiboard / 2] = 'x';
        reversi[reversiboard / 2][reversiboard / 2 - 1] = 'x';
        return reversi;
    }
    function output(reversi) {
        process.stdout.write(' ');
        reversi
            .reduce(function (k, t) {
            process.stdout.write(' ' + number_to_letter(k.toString()));
            return k + 1;
        }, 1);
        console.log();
        reversi
            .reduce(function (k, t) {
            process.stdout.write(number_to_letter(k.toString()));
            t.map(function (k) {
                process.stdout.write(' ' + k.toString());
                return k;
            });
            console.log();
            return k + 1;
        }, 1);
    }
    function reverse_reversi_once(reversi, _location, item) {
        var _dirction = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, -1], [-1, -1], [-1, 1], [1, 1]];
        return _dirction.reduce(function (k, t) {
            var sequ = go_boundary(reversi, t, _location, item);
            sequ.split('')
                .reduce(function (i, v) {
                k[_location[0] + (i - 1) * (t[0])][_location[1] + (i - 1) * (t[1])] = item;
                return i - 1;
            }, sequ.split('').length);
            return k;
        }, reversi);
    }
    function go_boundary(reversi, t, _location, item) {
        var reversiboard = reversi.reduce(function (k, t) { return k + 1; }, 0);
        var str = item;
        var x = _location[0];
        var y = _location[1];
        while (x <= reversiboard - 1 && x >= 0 && y >= 0 && y <= reversiboard - 1) {
            x = x + t[0];
            y = y + t[1];
            if (x >= reversiboard || y >= reversiboard || x < 0 || y < 0)
                break;
            if (reversi[x][y] == '.')
                break;
            if (reversi[x][y] == item) {
                str = str + reversi[x][y];
                break;
            }
            str = str + reversi[x][y];
        }
        return str.charAt(str.length - 1) != item || str.length == 1 ? '' : str;
    }
    function create_string(reversi, _location, item) {
        var _direction = [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [0, 1], [-1, 0], [0, -1]];
        return reversi[_location[0]][_location[1]] != '.' ? '' :
            _direction.reduce(function (k, t) {
                return k + go_boundary(reversi, t, _location, item) + '/';
            }, '');
    }
    function find_location(reversi, item) {
        var f = function (length) { return Array.from({ length: length }).map(function (v, k) { return k; }); }; //创造一个递增数组用于遍历
        var reversiboard = reversi.reduce(function (k, t) { return k + 1; }, 0); //计算棋盘大小
        var travel = f(reversiboard);
        return travel.reduce(function (point1, k) {
            var tp = travel.reduce(function (point0, t) {
                var _location = [k, t];
                var temp0 = create_string(reversi, _location, item).split('/').filter(function (x) { return x != ''; }).reduce(function (k1, k2) {
                    return k2.length - 2 > 0 ? k2.length - 2 + k1 : k1;
                }, 0);
                var temp0_point = { profit: temp0, location: _location };
                return temp0_point.profit > point0.profit ? temp0_point : point0;
            }, { profit: -1, location: [100, 100] });
            return tp.profit > point1.profit ? tp : point1;
        }, { profit: -1, location: [100, 100] });
    }
    function computer(reversi, human_item, computer_item) {
        var step = find_location(reversi, computer_item);
        var _location = step.location;
        step.profit > 0 ? console.log('Computer places ' + computer_item + '  at ' + number_to_letter((_location[0] + 1).toString()) + number_to_letter((_location[1] + 1).toString())) : process.stdout.write(computer_item + ' player has no valid move. ');
        step.profit > 0 ? reverse_reversi_once(reversi, step.location, computer_item) : 0;
        return step.profit > 0 ? 1 : 0;
    }
    function lottry() {
        var temp0 = Math.random();
        return temp0 > 0.5 ? ['o', 'x'] : ['x', 'o'];
    }
    function is_legal(reversi, _location, item) {
        var temp = create_string(reversi, _location, item);
        var profit = temp.split('/')
            .filter(function (x) { return x != ''; })
            .reduce(function (k, t) { return t.length - 2 > 0 ? t.length - 2 + k : k; }, 0);
        return profit > 0;
    }
    function sum_reversi(reversi, item) {
        var f = function (length) { return Array.from({ length: length }).map(function (v, k) { return k; }); }; //创造一个递增数组用于遍历
        var reversiboard = reversi.reduce(function (k, t) { return k + 1; }, 0); //计算棋盘大小
        var travel = f(reversiboard);
        return travel.reduce(function (sum1, k1) {
            return sum1 + travel.reduce(function (sum2, k2) {
                return reversi[k1][k2] == item ? sum2 + 1 : sum2;
            }, 0);
        }, 0);
    }
    function board_full(reversi, human_item, computer_item) {
        var human_reversi_num = sum_reversi(reversi, human_item);
        var computer_reversi_num = sum_reversi(reversi, computer_item);
        var reversiboard = reversi.reduce(function (k, t) { return k + 1; }, 0); //计算棋盘大小
        return human_reversi_num + computer_reversi_num == reversiboard * reversiboard ? 1 : 0;
    }
    function any_empty(reversi, human_item, computer_item) {
        var human_reversi_num = sum_reversi(reversi, human_item);
        var computer_reversi_num = sum_reversi(reversi, computer_item);
        return human_reversi_num == 0 ? human_item : (computer_reversi_num == 0 ? computer_item : 0);
    }
    function both_valid_move(reversi, human_item, computer_item) {
        return find_location(reversi, human_item).profit <= 0 ? (find_location(reversi, computer_item).profit <= 0 ? 1 : 0) : 0;
    }
    function board_full_log(start_time, reversiboard, computer_item) {
        var end_time = get_time();
        logPrinter(start_time, end_time, reversiboard, computer_item);
        console.log('reversi board is full!');
        return 1;
    }
    function any_empty_log(start_time, reversiboard, computer_item, temp) {
        var end_time = get_time();
        logPrinter(start_time, end_time, reversiboard, computer_item);
        console.log(temp + 'player is null');
        return 1;
    }
    function both_valid_move_log(start_time, reversiboard, computer_item) {
        var end_time = get_time();
        logPrinter(start_time, end_time, reversiboard, computer_item);
        console.log('Both players have no valid move. ');
        return 1;
    }
    function is_over(reversi, human_item, computer_item, start_time) {
        var reversiboard = reversi.reduce(function (k, t) { return k + 1; }, 0); //计算棋盘大小
        return board_full(reversi, human_item, computer_item) == 1 ? board_full_log(start_time, reversiboard, computer_item)
            : (any_empty(reversi, human_item, computer_item) == human_item ? any_empty_log(start_time, reversiboard, computer_item, human_item)
                : (any_empty(reversi, human_item, computer_item) == computer_item ? any_empty_log(start_time, reversiboard, computer_item, computer_item)
                    : (both_valid_move(reversi, human_item, computer_item) == 1 ? both_valid_move_log(start_time, reversiboard, computer_item) : 0)));
    }
    function go_over(human_item, computer_item, human_reversi_num, computer_reversi_num) {
        human_item == 'o' ? console.log('Game over.\n' + 'X : O = ' + computer_reversi_num.toString() + ' : ' + human_reversi_num.toString())
            : console.log('Game over.\n' + 'X : O = ' + human_reversi_num.toString() + ' : ' + computer_reversi_num.toString());
        Number(computer_reversi_num) == Number(human_reversi_num) ? console.log('Draw')
            : (Number(computer_reversi_num) < Number(human_reversi_num) ? console.log(human_item, ' player wins')
                : console.log(computer_item, ' player wins'));
        return 1;
    }
    function start_print1(reversi) {
        console.log('Computer plays (X/O): O');
        output(reversi);
    }
    function start_print2(reversi, human_item, computer_item) {
        console.log('Computer plays (X/O): X');
        output(reversi);
        computer(reversi, human_item, computer_item);
        output(reversi);
    }
    function play_reversi(d, start_time) {
        var reversiboard = Number(d);
        var reversi = init(reversiboard); //初始化棋盘
        var black_or_white = lottry();
        var human_item = black_or_white[0];
        var computer_item = black_or_white[1];
        computer_item == 'o' ? start_print1(reversi) : start_print2(reversi, human_item, computer_item);
        var stdin = process.openStdin();
        stdin.addListener("data", function (d) {
            console.log("Enter move for " + human_item + ' ' + '(RowCol): ' + d.toString().trim());
            var temp_loc = letter_to_number(d.toString().trim());
            var x0 = temp_loc[0] - 1;
            var y0 = temp_loc[1] - 1;
            var _location = [Number(x0), Number(y0)];
            if (!is_legal(reversi, _location, human_item)) {
                console.log('Invalid move. ');
                stdin.removeAllListeners(); //一种结束条件
                var end_time = get_time();
                logPrinter(start_time, end_time, reversiboard, computer_item);
                console.log('Game over.\n' +
                    computer_item + ' player wins. ');
                return 0;
            }
            reverse_reversi_once(reversi, _location, human_item);
            output(reversi);
            if (is_over(reversi, human_item, computer_item, start_time) == 1) {
                stdin.removeAllListeners();
                var human_reversi_num = sum_reversi(reversi, human_item);
                var computer_reversi_num = sum_reversi(reversi, computer_item);
                go_over(human_item, computer_item, human_reversi_num, computer_reversi_num);
                return 0;
            }
            computer(reversi, human_item, computer_item) == 1 ? output(reversi) : 0;
            // output(reversi);
            if (is_over(reversi, human_item, computer_item, start_time) == 1) {
                stdin.removeAllListeners();
                var human_reversi_num = sum_reversi(reversi, human_item);
                var computer_reversi_num = sum_reversi(reversi, computer_item);
                go_over(human_item, computer_item, human_reversi_num, computer_reversi_num);
                return 0;
            }
            while (find_location(reversi, human_item).profit <= 0) {
                if (is_over(reversi, human_item, computer_item, start_time)) {
                    stdin.removeAllListeners();
                    var human_reversi_num = sum_reversi(reversi, human_item);
                    var computer_reversi_num = sum_reversi(reversi, computer_item);
                    go_over(human_item, computer_item, human_reversi_num, computer_reversi_num);
                    return 0;
                }
                computer(reversi, human_item, computer_item);
                console.log(human_item + ' player has no valid move.');
                output(reversi);
            }
        });
        return computer_item;
    }
    function main() {
        var stdin = process.openStdin();
        var start_time = get_time();
        console.log('请输入你要的棋盘大小，输入一个4-10的偶数');
        console.log('之后下棋位置用字母字母输入按回车结束，如aa');
        console.log('棋盘从a开始计数');
        stdin.once('data', function (d) {
            var temp = d.toString().trim();
            console.log('Enter the board dimension: ' + temp);
            stdin.removeAllListeners();
            play_reversi(temp, start_time);
            return 0;
        });
    }
    return {
        setters: [
            function (log4js_1) {
                log4js = log4js_1;
            }
        ],
        execute: function () {
            main(); //执行main函数
        }
    };
});
