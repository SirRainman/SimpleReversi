/**
 * 博弈记录
 */
interface ReversiHistory {

    startTime: Date
    endTime: Date
    boardSize: number
    blackCount: number
    whiteCount: number
    /**
     * 一盘棋的所有操作
     */
    actions: ReversiAction[]
}

/**
 * 以 IndexedDB 为基础所实现的黑白棋数据库模型
 * 
 * 用于纪录玩家的对弈历史
 */
class ReversiDB {

    static readonly DBVersion = 2
    static readonly DBName = "reversidb"
    static readonly HistoryStoreName = "history"
    static readonly HistoryKeyPath = "startTime"

    dbOpenRequest: IDBOpenDBRequest
    db: IDBDatabase

    /**
     * 当数据库尚未准备完毕时,将请求数据库的操作做成闭包放入 onReady。
     * 当 dbIsReady 被设置为 true 时，将自动执行这些操作
     */
    private onReady: (() => void)[] = []
    private _dbIsReady: boolean = false
    get dbIsReady(): boolean {
        return this._dbIsReady
    }
    set dbIsReady(value) {
        this._dbIsReady = value
        if (this.dbIsReady) {
            //Todo: do something
            for (let func of this.onReady) {
                func()
            }
            this.onReady = []
        }
    }


    /**
     * 打开或创建 IndexedDB 数据库
     */
    constructor() {
        this.onReady = []
        this.dbOpenRequest = window.indexedDB.open(ReversiDB.DBName, ReversiDB.DBVersion)

        this.dbOpenRequest.onsuccess = (event: Event) => {
            this.db = this.dbOpenRequest.result
            this.dbIsReady = true
            console.log("ReversiDB Ready.")
        }

        this.dbOpenRequest.onerror = (event: ErrorEvent) => {
            alert("Database error: " + event.message)
        }

        this.dbOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
            let db = <IDBDatabase>(<IDBOpenDBRequest>event.target).result
            if (!db.objectStoreNames.contains(ReversiDB.HistoryStoreName)) {
                db.createObjectStore(
                    ReversiDB.HistoryStoreName,
                    { keyPath: ReversiDB.HistoryKeyPath }
                )
            }
            console.log(`DB version changed from ${event.oldVersion} to ${event.newVersion}`)
        }
    }

    /**
     * 添加新的纪录
     * @param {ReversiHistory} history 新的历史记录条目
     */
    add(history: ReversiHistory) {
        if (!this.dbIsReady) {
            this.onReady.push(() => {
                this.add(history)
            })
            return
        }
        let transaction = this.db.transaction(ReversiDB.HistoryStoreName, "readwrite")
        let store = transaction.objectStore(ReversiDB.HistoryStoreName)
        store.add(history)
    }

    /**
     * 获取所有的历史记录
     */
    getAll(callback: (item: ReversiHistory) => void) {
        if (!this.dbIsReady) {
            this.onReady.push(() => {
                this.getAll(callback)
            })
            return
        }
        let transaction = this.db.transaction(ReversiDB.HistoryStoreName)
        let store = transaction.objectStore(ReversiDB.HistoryStoreName)
        // return []
        var req = store.openCursor()
        req.onsuccess = (event: Event) => {
            let cursor = <IDBCursorWithValue>(<IDBRequest>event.target).result
            if (cursor) {
                callback(<ReversiHistory>cursor.value)
                cursor.continue()
            }
        }
    }
}