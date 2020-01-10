interface ChessboardStyle {
    originX: number
    originY: number
    // width?: number
    // height?: number
    lineWidth: number
    lineColor: string
    borderWidth: number
    borderColor: string
    backgroudColor: string
}

/**
 * 棋盘图形：(一个方形)
 * 
 * 棋盘样式由一个 ChessboardStyle 对象指定
 */
class ChessboardShape extends Rectangle {
    private numberOfHorizontalLines : number
    private numberOfVerticalLines : number
    verticalLines: Line[]
    horizontalLines: Line[]

    constructor(style: ChessboardStyle, width: number, height: number, boardSize: number) {
        //边框
        super(style.originX, style.originY, width, height)
        this.borderWidth = style.borderWidth
        this.borderColor = style.borderColor
        this.fillColor = style.backgroudColor
        this.numberOfHorizontalLines = boardSize + 1
        this.numberOfVerticalLines = boardSize + 1

        //线
        this.horizontalLines = []
        this.verticalLines = []

        let hOffSet = (this.width / (this.numberOfHorizontalLines + 1))
        for (let i = 0; i < this.numberOfHorizontalLines; i++) {
            let Y = this.originY + (i + 1) * hOffSet
            let hline = new Line(this.originX + hOffSet, Y, this.endX - hOffSet , Y)
            hline.lineWidth = style.lineWidth
            hline.strokeColor = style.lineColor
            this.horizontalLines.push(hline)
        }

        let vOffSet = (this.height / (this.numberOfVerticalLines + 1))
        for (let j = 0; j < this.numberOfVerticalLines; j++) {
            let X = this.originX + (j + 1) * vOffSet
            let vline = new Line(X, this.originY + vOffSet, X , this.endY - vOffSet)
            vline.lineWidth = style.lineWidth
            vline.strokeColor = style.lineColor
            this.verticalLines.push(vline)
        }
    }

    drawOn(ctx: CanvasRenderingContext2D) {
        ctx.save()
        this.fill = true
        super.drawOn(ctx)
        for (let i = 0; i < this.numberOfHorizontalLines; i++) {
            this.horizontalLines[i].drawOn(ctx)
        }
        for (let j = 0; j < this.numberOfVerticalLines; j++) {
            this.verticalLines[j].drawOn(ctx)
        }
        ctx.restore()
    }
}

