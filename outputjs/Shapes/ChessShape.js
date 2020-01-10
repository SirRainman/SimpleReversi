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
 * 棋子图形：
 *  一个圆
 */
var ChessShape = /** @class */ (function (_super) {
    __extends(ChessShape, _super);
    function ChessShape(style, centerX, centerY) {
        var _this = _super.call(this, centerX, centerY, style.radius) || this;
        _this.borderWidth = style.borderWidth;
        _this.borderColor = style.borderColor;
        _this.fill = true;
        _this.fillColor = style.fillColor;
        return _this;
    }
    ChessShape.prototype.drawOn = function (ctx) {
        _super.prototype.drawOn.call(this, ctx);
    };
    return ChessShape;
}(Circle));
