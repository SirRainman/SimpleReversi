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
/**
 * 棋盘图形：(一个方形)
 *
 * 棋盘样式由一个 ChessboardStyle 对象指定
 */
var ChessboardShape = /** @class */ (function (_super) {
    __extends(ChessboardShape, _super);
    function ChessboardShape(style, width, height, boardSize) {
        var _this = 
        //边框
        _super.call(this, style.originX, style.originY, width, height) || this;
        _this.borderWidth = style.borderWidth;
        _this.borderColor = style.borderColor;
        _this.fillColor = style.backgroudColor;
        _this.numberOfHorizontalLines = boardSize + 1;
        _this.numberOfVerticalLines = boardSize + 1;
        //线
        _this.horizontalLines = [];
        _this.verticalLines = [];
        var hOffSet = (_this.width / (_this.numberOfHorizontalLines + 1));
        for (var i = 0; i < _this.numberOfHorizontalLines; i++) {
            var Y = _this.originY + (i + 1) * hOffSet;
            var hline = new Line(_this.originX + hOffSet, Y, _this.endX - hOffSet, Y);
            hline.lineWidth = style.lineWidth;
            hline.strokeColor = style.lineColor;
            _this.horizontalLines.push(hline);
        }
        var vOffSet = (_this.height / (_this.numberOfVerticalLines + 1));
        for (var j = 0; j < _this.numberOfVerticalLines; j++) {
            var X = _this.originX + (j + 1) * vOffSet;
            var vline = new Line(X, _this.originY + vOffSet, X, _this.endY - vOffSet);
            vline.lineWidth = style.lineWidth;
            vline.strokeColor = style.lineColor;
            _this.verticalLines.push(vline);
        }
        return _this;
    }
    ChessboardShape.prototype.drawOn = function (ctx) {
        ctx.save();
        this.fill = true;
        _super.prototype.drawOn.call(this, ctx);
        for (var i = 0; i < this.numberOfHorizontalLines; i++) {
            this.horizontalLines[i].drawOn(ctx);
        }
        for (var j = 0; j < this.numberOfVerticalLines; j++) {
            this.verticalLines[j].drawOn(ctx);
        }
        ctx.restore();
    };
    return ChessboardShape;
}(Rectangle));
