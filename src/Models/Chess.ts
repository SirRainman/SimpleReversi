/**
 * 棋盘上的棋子：黑子、白子、空
 */
enum Chess {
    None = 0,
    Black = 1, //should equal Player.Black 
    White = 2  //should equal Player.White
    //Todo: keep consistency between Player and Chessman
}

/**
 * 返回玩家所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 玩家的棋子
 */
function chessOfPlayer(player: ReversiPlayer): Chess {
    return Chess[ReversiPlayer[player]]
}

/**
 * 返回对手所持有的棋子
 * @param {Player} player 玩家
 * @return {Chess} 对手的棋子
 */
function chessOfRival(rival: ReversiPlayer): Chess {
    return Chess[ReversiPlayer[rival]]
}