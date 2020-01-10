class ReversiView extends AbstractCanvasView {
    theme: Theme = new DefaultTheme()
    stepNumberFont: string = "15px menlo"

    public horizontalLineGap: number
    public verticalLineGap: number
    
    /**
     * 视图持有对其控制器的引用
     */
    viewController: ReversiViewController

    constructor(width: number, height: number, viewController: ReversiViewController, boardSize: number) {
        super(width, height, "game")
        this.viewController = viewController
        
        this.horizontalLineGap = this.bound.width / (boardSize + 2)
        this.verticalLineGap = this.bound.height / (boardSize + 2)

        this.drawChessboard(boardSize)

        this.registerEvents()
    }

    /**
     * 在第i行第j列放置一个棋子 (无越界检查)
     * @param {number} row 第i行
     * @param {number} col 第j列
     */
    public putChessOn(row: number, col: number, chess: Chess) {
        if(chess == Chess.None) return

        let coord = this.getChessPosition(row, col)
        let style = chess == Chess.Black ? this.theme.blackChessStyle : this.theme.whiteChessStyle
        
        new ChessShape({
            // 半径是写死在theme中的
            // radius: style.radius,
            radius: this.horizontalLineGap / 2.2,
            borderColor: style.borderColor,
            borderWidth: style.borderWidth,
            fillColor: style.fillColor
        }, coord.x, coord.y).drawOn(this.context)
    }

    /**
     * 获取第i行第j列的棋子的坐标 (无越界检查)
     * @param {number} row 第i行
     * @param {number} col 第j列
     */
    private getChessPosition(row: number, col: number){
        return {
            x: this.theme.chessboardStyle.originY + this.verticalLineGap / 2 + col * this.horizontalLineGap,
            y: this.theme.chessboardStyle.originX + this.horizontalLineGap / 2 + row * this.verticalLineGap
        }
    }

    /**
     * 绘制棋盘
     */
    public drawChessboard(boardSize: number) {
        this.context.clearRect(0, 0, this.bound.width, this.bound.height)

        new ChessboardShape(
            this.theme.chessboardStyle, 
            this.bound.width, this.bound.height,
            boardSize
        ).drawOn(this.context)
    }

    /**
    * 重新绘制棋盘
    */
   rePrintBoard(board: Chess[][], boardSize: number) {
    this.drawChessboard(boardSize)
    for (let row = 1; row <= boardSize; row++) {
        for (let col = 1; col <= boardSize; col++) {
            this.putChessOn(row, col, board[row][col])
        }
    }
}
   
    /**
     * 注册Canvas事件, 设置事件处理函数 (将事件交由Controller处理)
     * 
     *  警告: 不能直接将控制器的方法作为闭包传入回调
     *        这将导致控制器方法中的this指针指向canvas对象而不是控制器对象
     */
    private registerEvents() {
        this.addEventListener("click", (event: MouseEvent) => {
            this.viewController.handleClickEvent(event.offsetX, event.offsetY)
        })
    }
}