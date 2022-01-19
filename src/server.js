

var server = require('express')
const questionController = require('./controllers/questionController')
const app = server()
const port = 3000   

app.use(server.static('public'))

app.set('view engine', 'ejs');
app.set("views", __dirname + '\\views');
app.use(server.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('home')
})

//Formato para envio de informações do form
//app.post('/room/:room/:question/:action', (req, res) => {
   // res.render('exemplo', {req})
//})

app.post('/room/:room/:question/:action', (req, res) => {
   questionController.index(req,res)
})




app.get('/room', (req, res) => {
    res.render('room')
})

app.get('/create-room', (req, res) => {
    res.render('create-room')
})

app.listen(port, ()=>{console.log('Server start')});