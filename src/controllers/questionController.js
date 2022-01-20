
const Database = require('../db/config')

module.exports = {

    async index(req,res){

        const db = await Database()

        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password

        console.log(`roomId = ${roomId} questionId = ${questionId} action = ${action} password = ${password}`)

        const passwordRoom = await db.all(`SELECT pass AS password FROM room WHERE id = ${roomId}`)
        console.log('chegou aki')
        
        if( passwordRoom[0].password == password){
            if(action == "check"){
                await db.run(`UPDATE question SET READ = 1 WHERE id = ${questionId}`)
            }else if(action == "delete"){
                await db.run(`DELETE FROM question WHERE id = ${questionId}`)
            }

            res.redirect(`/room/${roomId}`)
        }else{
            res.render('passincorrect', {roomId: roomId})
        }

     
    },
    async create(req,res){

    
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.roomId

        await db.run(`
            INSERT INTO QUESTION (title, read, roomId) 
            VALUES ("${question}",0,${roomId})
        `)

        res.redirect(`/room/${roomId}`)
    }
}