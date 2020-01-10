class SimpleAI extends ReversiAI {

    boardScore: number[][]

    constructor() {
        super()
    }

    private calScore(board: Chess[][], action: ReversiAction): number {

        let score: number = 0
        let row = action.row
        let col = action.col
        let now: Chess = action.player == ReversiPlayer.Black ? Chess.Black : Chess.White
        let next: Chess = now == Chess.White ? Chess.Black : Chess.White

        var size = board[0].length - 1

        let direction = [
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
            for (let i = row + value[0], j = col + value[1]; i >= 1 && i < size && j >= 1 && j < size; i += value[0], j += value[1]) {
                if (board[i][j] == next) {
                    continue;
                } else if (board[i][j] == now) {  
                    between = (index == 2 || index == 3) ? Math.abs(col - j) - 1 : Math.abs(row - i) - 1
                    score += between
                    break;
                } else if (board[i][j] == Chess.None) break;
            }
            for (let i = 1; i <= between; i++) {
                board[row + i * value[0]][col + i * value[1]] = now;
            }
        })

        return score
    }

    private calBoardScore(board: Chess[][], player: ReversiPlayer): number[][] {
        let scoreS: number[][] = []
        let size = board[0].length - 1
        for (let row: number = 0; row <= size; row++) {
            let rowX: number[] = []
            for (let col: number = 0; col <= size; col++) {
                rowX.push(0)
            }
            scoreS.push(rowX)
        }

        for (let row: number = 1; row <= size; row++) {
            for (let col: number = 1; col <= size; col++) {
                if (board[row][col] == Chess.None) {
                    let action: ReversiAction = new ReversiAction(row, col, player)
                    scoreS[row][col] = this.calScore(board, action)
                }
            }
        }
        return scoreS
    }



    public getNextAction(board: Chess[][], player: ReversiPlayer): ReversiAction {

        let copy: Chess[][] = []
        for (let row: number = 0; row <= board[0].length - 1; row++) {
            let rowX: number[] = []
            for (let col: number = 0; col <= board[row].length - 1; col++) {
                rowX.push(board[row][col])
            }
            copy.push(rowX)
        }

        this.boardScore = this.calBoardScore(copy, player)

        let action: ReversiAction = new ReversiAction(0, 0, player)
        let max = 0

        let size = board[0].length - 1;
        for (let row = 1; row <= size; row++) {
            for (let col = 1; col <= size; col++) {
                if (this.boardScore[row][col] > max) {
                    action.row = row
                    action.col = col
                    max = this.boardScore[row][col]
                }
            }
        }
        return action
    }
}