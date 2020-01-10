class ReversiAction {
    row: number
    col: number
    player: ReversiPlayer

    constructor(row: number, col: number, player: ReversiPlayer) {
        this.row = row
        this.col = col
        this.player = player
    }
}

class PlayerChessCount {
    whiteCount: number
    blackCount: number
    constructor() {
        this.whiteCount = 0
        this.blackCount = 0
    }
}

/**
 * 控制游戏规则，判断胜负
 */
class ReversiGame {

    private maxRow: number
    private maxCol: number

    chessboard: Chessboard
    lastAction: ReversiAction
    allActions: ReversiAction[]
    currentPlayer: ReversiPlayer = ReversiPlayer.Black // 黑棋先行
    gameIsOver: boolean = false


    constructor(boardSize: number) {
        this.maxCol = boardSize
        this.maxRow = boardSize

        // 问题：为什么这里可以直接初始化Chessboard类，而下面不可以直接初始化Action类
        this.chessboard = new Chessboard(this.maxRow, this.maxCol)

        this.allActions = []
    }


    /**
     * 当前玩家在坐标上落子,成功落子后返回 true
     * (将充分检查以确保安全落子)
     *  落子后将变更当前玩家
     * @param {number} row 行坐标
     * @param {number} col 列坐标
     */
    public putChessOn(row: number, col: number): boolean {
        if (this.gameIsOver) return false
        // 问题：注意这里没有解决直接引用Action类
        var action = new ReversiAction(row, col, this.currentPlayer)

        /**
         * 检查三种异常：
         * 1.越界：
         * 2.下在有子的地方：
         * 3.黑白棋特有的规则：
         */
        if (this.chessboard.validRowAndCol(row, col) && !this.chessboard.hasChess(row, col)
            && this.isValidAction(action, true)) {

            this.chessboard.putChess(row, col, chessOfPlayer(this.currentPlayer))
            // 将该位置加入到棋局中
            this.lastAction = action
            this.allActions.push(this.lastAction)

            // 判断比赛是否结束
            this.isFinished()

            // 交换棋手（首先判断是否能够交换）
            let nextPlayer = changePlayer(this.currentPlayer)
            if (this.checkValidSpace(nextPlayer)) {
                this.currentPlayer = nextPlayer
            }
            return true
        }
        return false
    }

    /**
     * 判断最近的一次游戏动作是否使一方获胜
     *  (以最近的一次落子坐标为基准,分别检查横向、纵向、主对角线、副对角线方向是否存在获胜棋组
     *   并保存获胜棋组)
     */
    isFinished(): boolean {
        if (!this.checkValidSpace(ReversiPlayer.Black) && !this.checkValidSpace(ReversiPlayer.White)) {
            this.gameIsOver = true
            return true
        }
        return false
    }

    getChessCount(): PlayerChessCount {
        let playerCount = new PlayerChessCount()
        for (let row = 1; row <= this.chessboard.numberOfRows; row++) {
            for (let col = 1; col <= this.chessboard.numberOfColumns; col++) {
                if (this.chessboard.getChess(row, col) == Chess.Black) playerCount.blackCount++
                else if (this.chessboard.getChess(row, col) == Chess.White) playerCount.whiteCount++
            }
        }
        return playerCount
    }

    /**
     * 判断当前棋手是否有落子的机会
     */
    checkValidSpace(player: ReversiPlayer) {
        for (let row = 1; row <= this.chessboard.numberOfRows; row++) {
            for (let col = 1; col <= this.chessboard.numberOfColumns; col++) {
                // 如果该地方没有落子，且对于该棋手来说可以落子，则返回true
                if (!this.chessboard.hasChess(row, col) && this.isValidAction(new ReversiAction(row, col, player), false)) {
                    // console.log(row, col);
                    return true
                }
            }
        }
        return false
    }

    /**
     * 判断是否符合黑白棋的落子规则
     * 1.以空棋盘格为中心的 8 个方向(东南西北及对角线方向)中，至少在一个方向上，对手的棋子与该空棋盘格构成连续直线;
     * 2.在该直线的末端必须已经放置有一颗本方棋子。玩家落子后，满足上述规则的对手棋子被翻转为本方棋子颜色。
     */
    isValidAction(action: ReversiAction, isChange: boolean): boolean {

        let isValid: boolean = false
        let row = action.row
        let col = action.col
        let board = this.chessboard.getChessBoard()
        let now: Chess = action.player == ReversiPlayer.Black ? Chess.Black : Chess.White
        let next: Chess = now == Chess.White ? Chess.Black : Chess.White

        let direction = [     //方向
            [-1, 0],    
            [1, 0],     
            [0, -1],    
            [0, 1],     
            [-1, -1],   
            [-1, 1],    
            [1, -1],    
            [1, 1]
        ]

        direction.forEach((value, index) => { 
            let between = 0
            for (let i = row + value[0], j = col + value[1]; i >= 1 && i < board[0].length && j >= 1 && j < board[0].length; i += value[0], j += value[1]) {
                if (board[i][j] == next) { 
                    continue;
                } else if (board[i][j] == now) {
                    between = (index == 2 || index == 3) ? Math.abs(col - j) - 1 : Math.abs(row - i) - 1 
                    break;
                } else if (board[i][j] == Chess.None) break;
            }
            if(between > 0) isValid = true
            if (isChange) {
                for (let i = 1; i <= between; i++) {
                    board[row + i * value[0]][col + i * value[1]] = now;
                }
            }
        })

        return isValid
    }
}