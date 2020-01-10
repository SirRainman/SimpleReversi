/**
 * 所有用于在 Canvas 绘制的图形继承自该类
 */
var Shape = /** @class */ (function () {
    function Shape(originX, originY) {
        this.originX = originX;
        this.originY = originY;
        this.lineWidth = Shape.DefaultLineWidth;
        this.strokeColor = Shape.DefaultLineColor;
        this.fillColor = Shape.DefualtFillColor;
    }
    Shape.DefaultLineWidth = 1;
    Shape.DefaultLineColor = "black";
    Shape.DefualtFillColor = "white";
    return Shape;
}());
