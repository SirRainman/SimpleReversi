/**
 *  (在控制器中使用继承该类的子类)
 */
abstract class ReversiAI {
    /**
     * 给出下一次动作
     */
    abstract getNextAction(board: Chess[][], player: ReversiPlayer): ReversiAction
}