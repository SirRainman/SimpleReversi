var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SimpleAI = /** @class */ (function (_super) {
    __extends(SimpleAI, _super);
    function SimpleAI() {
        return _super.call(this) || this;
    }
    SimpleAI.prototype.calScore = function (board, action) {
        var score = 0;
        var row = action.row;
        var col = action.col;
        var now = action.player == ReversiPlayer.Black ? Chess.Black : Chess.White;
        var next = now == Chess.White ? Chess.Black : Chess.White;
        var size = board[0].length - 1;
        var direction = [
            [-1, 0],
            [1, 0],
            [0, -1],
            [0, 1],
            [-1, -1],
            [-1, 1],
            [1, -1],
            [1, 1]
        ];
        direction.forEach(function (value, index) {
            var between = 0;
            for (var i = row + value[0], j = col + value[1]; i >= 1 && i < size && j >= 1 && j < size; i += value[0], j += value[1]) {
                if (board[i][j] == next) {
                    continue;
                }
                else if (board[i][j] == now) {
                    between = (index == 2 || index == 3) ? Math.abs(col - j) - 1 : Math.abs(row - i) - 1;
                    score += between;
                    break;
                }
                else if (board[i][j] == Chess.None)
                    break;
            }
            for (var i = 1; i <= between; i++) {
                board[row + i * value[0]][col + i * value[1]] = now;
            }
        });
        return score;
    };
    SimpleAI.prototype.calBoardScore = function (board, player) {
        var scoreS = [];
        var size = board[0].length - 1;
        for (var row = 0; row <= size; row++) {
            var rowX = [];
            for (var col = 0; col <= size; col++) {
                rowX.push(0);
            }
            scoreS.push(rowX);
        }
        for (var row = 1; row <= size; row++) {
            for (var col = 1; col <= size; col++) {
                if (board[row][col] == Chess.None) {
                    var action = new ReversiAction(row, col, player);
                    scoreS[row][col] = this.calScore(board, action);
                }
            }
        }
        return scoreS;
    };
    SimpleAI.prototype.getNextAction = function (board, player) {
        var copy = [];
        for (var row = 0; row <= board[0].length - 1; row++) {
            var rowX = [];
            for (var col = 0; col <= board[row].length - 1; col++) {
                rowX.push(board[row][col]);
            }
            copy.push(rowX);
        }
        this.boardScore = this.calBoardScore(copy, player);
        var action = new ReversiAction(0, 0, player);
        var max = 0;
        var size = board[0].length - 1;
        for (var row = 1; row <= size; row++) {
            for (var col = 1; col <= size; col++) {
                if (this.boardScore[row][col] > max) {
                    action.row = row;
                    action.col = col;
                    max = this.boardScore[row][col];
                }
            }
        }
        return action;
    };
    return SimpleAI;
}(ReversiAI));
