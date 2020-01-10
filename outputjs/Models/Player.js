/**
 * 玩家：黑、白
 */
var ReversiPlayer;
(function (ReversiPlayer) {
    ReversiPlayer[ReversiPlayer["Black"] = 1] = "Black";
    ReversiPlayer[ReversiPlayer["White"] = 2] = "White";
})(ReversiPlayer || (ReversiPlayer = {}));
/**
 * 改变当前玩家, 返回新玩家
 * @param {Player} player 当前玩家
 * @return {Player} 新玩家
 */
function changePlayer(player) {
    if (player == ReversiPlayer.Black) {
        return ReversiPlayer.White;
    }
    else {
        return ReversiPlayer.Black;
    }
}
