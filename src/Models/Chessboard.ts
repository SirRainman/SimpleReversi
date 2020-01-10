/**
 * 包含棋子的棋盘
 */
class Chessboard {
    /**
     * 存储棋子对象的二维数组
     */
    private chessboard: Chess[][]
    readonly numberOfRows: number
    readonly numberOfColumns: number

    constructor(numberOfRows: number, numberOfColumns: number) {
        this.chessboard = []
        this.numberOfRows = numberOfRows
        this.numberOfColumns = numberOfColumns

        for (let i = 0; i <= numberOfRows; i++) {
            let row: Chess[] = []
            for (let j = 0; j <= numberOfColumns; j++) {
                row.push(Chess.None)
            }
            this.chessboard.push(row)
        }

        // 问题：初始化放置四个棋子
        this.chessboard[numberOfRows / 2][numberOfColumns / 2 + 1] = Chess.Black
        this.chessboard[numberOfRows / 2 + 1][numberOfColumns / 2 + 1] = Chess.White
        this.chessboard[numberOfRows / 2][numberOfColumns / 2] = Chess.White
        this.chessboard[numberOfRows / 2 + 1][numberOfColumns / 2] = Chess.Black
    }

    /**
     * 判断坐标是否有棋子(可以指定棋子类型)
     * 
     * 坐标越界则返回 undefined
     * @param {Chessman} givenChess 指定棋子的类型
     */
    public hasChess(row: number, col: number, givenChess?: Chess): boolean {
        if (givenChess) {
            return this.validRowAndCol(row, col) ? this.chessboard[row][col] != givenChess : undefined
        } else {
            return this.validRowAndCol(row, col) ? this.chessboard[row][col] != Chess.None : undefined
        }
    }

    public getChess(row: number, col: number): Chess {
        return this.validRowAndCol(row, col) ? this.chessboard[row][col] : undefined
    }

    putChess(row: number, col: number, chess: Chess) {
        if (this.validRowAndCol(row, col)) {
            this.chessboard[row][col] = chess
        }
    }

    public getChessBoard() : Chess[][] {
        return this.chessboard
    }

    // 判断棋子是否超出棋盘的边界
    validRowAndCol(row: number, col: number): boolean {
        return 1 <= row && row <= this.numberOfRows
            && 1 <= col && col <= this.numberOfColumns ?
            true : false
    }

    
}