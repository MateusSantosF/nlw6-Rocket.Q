
const Database = require('../db/config')

module.exports = {

    async create(req,res){
        
        const db = await Database()
        const pass = req.body.password

        /* Gerando ID da sala */
        let roomId = this.createRoomId();

        /* VERIFICANDO SE ID JÁ EXISTe */
        let checkId = 0;

        checkId = await db.all(`SELECT COUNT(ID) AS ID FROM ROOM WHERE ID =${roomId}`) 
        if( checkId[0].ID >= 1){
            roomId = this.createRoomId();
            checkId = await db.all(`SELECT COUNT(ID) FROM ROOM WHERE ID =${roomId}`)
            while(checkId[0].ID >= 1){
                roomId = this.createRoomId();
                checkId = await db.all(`SELECT COUNT(ID) FROM ROOM WHERE ID =${roomId}`)
            }
        }

        await db.run(`
            INSERT INTO ROOM (id, pass) VALUES (${parseInt(roomId)}, ${pass})
        `)

        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    async open(req, res){

        const db = await Database()
        const roomId = req.params.room
        let existQuestions = true
    
        const questions = await db.all(`SELECT * FROM QUESTION WHERE roomID = ${roomId} and read = 0`)
        const questionsRead = await db.all(`SELECT * FROM QUESTION WHERE roomID = ${roomId} and read = 1`)

        if(questions.length == 0 && questionsRead.length == 0){
            existQuestions = false;
        }

        res.render('room',{roomId: roomId, questions:questions, questionsRead:questionsRead, existQuestions:existQuestions})
    },
    createRoomId(){
        let roomId = "";
        for( var i = 0; i < 6; i++){
            roomId += Math.floor(Math.random() * 10).toString();
        }

        return roomId
    },
    enter(req, res){

        const roomId = req.body.roomId
        console.log("teste" + roomId)
        res.redirect(`/room/${roomId}`)
    }
}