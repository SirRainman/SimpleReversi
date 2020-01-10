/**
 * 包含棋子的棋盘
 */
var Chessboard = /** @class */ (function () {
    function Chessboard(numberOfRows, numberOfColumns) {
        this.chessboard = [];
        this.numberOfRows = numberOfRows;
        this.numberOfColumns = numberOfColumns;
        for (var i = 0; i <= numberOfRows; i++) {
            var row = [];
            for (var j = 0; j <= numberOfColumns; j++) {
                row.push(Chess.None);
            }
            this.chessboard.push(row);
        }
        // 问题：初始化放置四个棋子
        this.chessboard[numberOfRows / 2][numberOfColumns / 2 + 1] = Chess.Black;
        this.chessboard[numberOfRows / 2 + 1][numberOfColumns / 2 + 1] = Chess.White;
        this.chessboard[numberOfRows / 2][numberOfColumns / 2] = Chess.White;
        this.chessboard[numberOfRows / 2 + 1][numberOfColumns / 2] = Chess.Black;
    }
    /**
     * 判断坐标是否有棋子(可以指定棋子类型)
     *
     * 坐标越界则返回 undefined
     * @param {Chessman} givenChess 指定棋子的类型
     */
    Chessboard.prototype.hasChess = function (row, col, givenChess) {
        if (givenChess) {
            return this.validRowAndCol(row, col) ? this.chessboard[row][col] != givenChess : undefined;
        }
        else {
            return this.validRowAndCol(row, col) ? this.chessboard[row][col] != Chess.None : undefined;
        }
    };
    Chessboard.prototype.getChess = function (row, col) {
        return this.validRowAndCol(row, col) ? this.chessboard[row][col] : undefined;
    };
    Chessboard.prototype.putChess = function (row, col, chess) {
        if (this.validRowAndCol(row, col)) {
            this.chessboard[row][col] = chess;
        }
    };
    Chessboard.prototype.getChessBoard = function () {
        return this.chessboard;
    };
    // 判断棋子是否超出棋盘的边界
    Chessboard.prototype.validRowAndCol = function (row, col) {
        return 1 <= row && row <= this.numberOfRows
            && 1 <= col && col <= this.numberOfColumns ?
            true : false;
    };
    return Chessboard;
}());
