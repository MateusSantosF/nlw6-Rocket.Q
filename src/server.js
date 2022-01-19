

var server = require('express')
const app = server()
const port = 3000

app.use(server.static('public'))
app.set('view engine', 'ejs');
app.set("views", __dirname + '\\views');

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/room', (req, res) => {
    res.render('room')
})

app.get('/create-room', (req, res) => {
    res.render('create-room')
})

app.listen(port, ()=>{console.log('Server start')});