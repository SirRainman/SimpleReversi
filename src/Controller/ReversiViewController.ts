class ReversiViewController {
    gameView: ReversiView //游戏视图
    menuView: MenuView  //菜单视图
    dialogView: DialogView //模态对话框视图
    reversiGame: ReversiGame //游戏规则
    AI: ReversiAI // AI
    reversiDB: ReversiDB // 数据持久化
    boardSize: number // 棋盘大小
    startTime: Date // 开始时间
    endTime: Date // 结束时间

    private historiesHaveLoaded: boolean = false

    constructor(size: number) {

        // 应该先询问棋盘的大小，在画出棋盘
        this.boardSize = size

        //Views
        this.gameView = new ReversiView(480, 480, this, this.boardSize)
        this.menuView = new MenuView(480, 200, this)
        this.menuView.statusMessage = "黑手"
        this.dialogView = new DialogView()

        //Models
        this.reversiGame = new ReversiGame(this.boardSize)
        this.reversiDB = new ReversiDB()

        this.AI = new SimpleAI(); // 假设AI执白棋

        this.gameView.rePrintBoard(this.reversiGame.chessboard.getChessBoard(), this.boardSize)

        // 开始时间
        // this.startTime = Date.parse(new Date().toString());
        this.startTime = new Date()
    }

    /**
     * 读取数据库,将历史记录写入对话框视图
     */
    private loadHistory() {

    }

    /**
     * 响应棋盘上的点击
     */
    public handleClickEvent(x: number, y: number) {

        // 如果比赛已经结束，则不允许再落子
        if (this.reversiGame.gameIsOver) return

        // 如果棋局中无地方可以落子，则不允许落子
        // bug：如果该角色没有地方可以落子，那么该角色必须点一下棋盘才能落子！！！！！！！！！！！！！！！！！！！！！！！！
        // 输出当前角色没有地方可以落子
        if (!this.reversiGame.checkValidSpace(this.reversiGame.currentPlayer)) {
            this.menuView.statusMessage = (this.reversiGame.currentPlayer == ReversiPlayer.Black ? "黑手" : "白手") + "无子可下"
            return
        }
        this.menuView.statusMessage = (this.reversiGame.currentPlayer == ReversiPlayer.Black ? "黑手" : "白手")

        // 得到玩家落子的行和列
        let col = Math.floor(x / this.gameView.horizontalLineGap)
        let row = Math.floor(y / this.gameView.verticalLineGap)

        // 如果没有轮到该玩家落子，应该及时退出!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


        // 如果落子不符合规则，则退出，若符合则将棋子键值对加入到全局数据结构中
        if (!this.reversiGame.putChessOn(row, col)) {
            this.menuView.statusMessage = (this.reversiGame.currentPlayer == ReversiPlayer.Black ? "黑手" : "白手") + "落子违规"
            return
        } else {
            let chessCount = this.reversiGame.getChessCount()
            // 重新打印棋盘
            this.gameView.rePrintBoard(this.reversiGame.chessboard.getChessBoard(), this.boardSize)
            // 重新打印棋数
            this.rePrintChessCount(chessCount.whiteCount, chessCount.blackCount)
        }


        // AI落子
        while (!this.reversiGame.gameIsOver && this.reversiGame.currentPlayer == ReversiPlayer.White) {
            let result = this.AI.getNextAction(this.reversiGame.chessboard.getChessBoard(), this.reversiGame.currentPlayer)
            if (!this.reversiGame.putChessOn(result.row, result.col)) {
                this.menuView.statusMessage = "白手落子违规"
                return
            } else {
                let chessCount = this.reversiGame.getChessCount()
                this.rePrintChessCount(chessCount.whiteCount, chessCount.blackCount)
            }
            // 重新打印棋盘
            this.gameView.rePrintBoard(this.reversiGame.chessboard.getChessBoard(), this.boardSize)
        }

        // 检查比赛是否结束
        if (this.reversiGame.gameIsOver) {
            // 显示比赛结果
            let resultCount = this.reversiGame.getChessCount()
            let winner = resultCount.blackCount > resultCount.whiteCount ? "黑手" : "白手"
            this.menuView.statusMessage = "比赛结束：" + winner + "胜"

            this.endTime = new Date()
            // require 只能用在nodejs环境下，不能用在浏览器前端
            // let reversiLog = new ReversiLog()
            // reversiLog.logGenerator(this.endTime - this.startTime, this.boardSize, resultCount)

            this.reversiDB.add({
                startTime: this.startTime,
                endTime: this.endTime,
                boardSize: this.boardSize,
                blackCount: resultCount.blackCount,
                whiteCount: resultCount.whiteCount,
                actions: this.reversiGame.allActions
            })
        }
    }


    /**
     * 重绘棋数
     * bug: 这个方法放在哪里才合适？
     */
    public rePrintChessCount(white: number, black: number) {
        this.menuView.witheChessCount = white
        this.menuView.blackChessCount = black
    }

    /**
     * 显示历史记录对话框
     */
    public toggleDialog() {
        this.dialogView.toggle()
    }
}