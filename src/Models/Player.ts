/**
 * 玩家：黑、白
 */
enum ReversiPlayer {
    Black = 1,
    White = 2
}

/**
 * 改变当前玩家, 返回新玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player: ReversiPlayer): ReversiPlayer {
    if (player == ReversiPlayer.Black) {
        return ReversiPlayer.White
    } else {
        return ReversiPlayer.Black
    }
}