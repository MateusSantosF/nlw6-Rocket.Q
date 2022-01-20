

var server = require('express')
const questionController = require('./controllers/questionController')
const roomController = require('./controllers/roomController')
const app = server()
const port = 3000   

app.use(server.static('public'))

app.set('view engine', 'ejs');
app.set("views", __dirname + '\\views');
app.use(server.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('home', {page:'enter-room'})
})

app.get('/create-room', (req, res) => {
    res.render('home', {page:'create-room'})
})

app.get('/room/:room', (req, res) => {
    roomController.open(req,res)
})

app.post('/create', (req,res)=> {
    roomController.create(req,res)
})

app.post('/enterroom', (req,res)=>{
    roomController.enter(req,res)
} )

/*questions */
app.post('/question/create/:roomId', (req,res)=>{
    questionController.create(req,res)
})


app.post('/question/:room/:question/:action', (req, res) => {
    questionController.index(req,res)
 })

app.listen(port, ()=>{console.log('Server start')});