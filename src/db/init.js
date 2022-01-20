
const Database = require('./config')

const initDb = {
    async init(){
        const db = await Database()
        console.log(db)
        await db.run(`CREATE TABLE room(
                id INTEGER PRIMARY KEY,
                pass TEXT
            )`)
    
        await db.run(`CREATE TABLE question(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            read INT,
            roomId INT
        )`)
    
    
       await db.close()
    }
}

initDb.init()