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
var ReversiView = /** @class */ (function (_super) {
    __extends(ReversiView, _super);
    function ReversiView(width, height, viewController, boardSize) {
        var _this = _super.call(this, width, height, "game") || this;
        _this.theme = new DefaultTheme();
        _this.stepNumberFont = "15px menlo";
        _this.viewController = viewController;
        _this.horizontalLineGap = _this.bound.width / (boardSize + 2);
        _this.verticalLineGap = _this.bound.height / (boardSize + 2);
        _this.drawChessboard(boardSize);
        _this.registerEvents();
        return _this;
    }
    /**
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行
     * @param {number} col 第j列
     */
    ReversiView.prototype.putChessOn = function (row, col, chess) {
        if (chess == Chess.None)
            return;
        var coord = this.getChessPosition(row, col);
        var style = chess == Chess.Black ? this.theme.blackChessStyle : this.theme.whiteChessStyle;
        new ChessShape({
            // 半径是写死在theme中的
            // radius: style.radius,
            radius: this.horizontalLineGap / 2.2,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }, coord.x, coord.y).drawOn(this.context);
    };
    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行
     * @param {number} col 第j列
     */
    ReversiView.prototype.getChessPosition = function (row, col) {
        return {
            x: this.theme.chessboardStyle.originY + this.verticalLineGap / 2 + col * this.horizontalLineGap,
            y: this.theme.chessboardStyle.originX + this.horizontalLineGap / 2 + row * this.verticalLineGap
        };
    };
    /**
     * 绘制棋盘
     */
    ReversiView.prototype.drawChessboard = function (boardSize) {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height);
        new ChessboardShape(this.theme.chessboardStyle, this.bound.width, this.bound.height, boardSize).drawOn(this.context);
    };
    /**
    * 重新绘制棋盘
    */
    ReversiView.prototype.rePrintBoard = function (board, boardSize) {
        this.drawChessboard(boardSize);
        for (var row = 1; row <= boardSize; row++) {
            for (var col = 1; col <= boardSize; col++) {
                this.putChessOn(row, col, board[row][col]);
            }
        }
    };
    /**
     * 注册Canvas事件, 设置事件处理函数 (将事件交由Controller处理)
     *
     *  警告: 不能直接将控制器的方法作为闭包传入回调
     *        这将导致控制器方法中的this指针指向canvas对象而不是控制器对象
     */
    ReversiView.prototype.registerEvents = function () {
        var _this = this;
        this.addEventListener("click", function (event) {
            _this.viewController.handleClickEvent(event.offsetX, event.offsetY);
        });
    };
    return ReversiView;
}(AbstractCanvasView));
