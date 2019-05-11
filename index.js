var express = require('express')
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(server);
var port = process.env.port || 3000;

// Routes
var indexRouter = require('./routes/index')
app.use('/', indexRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static directory
app.use(express.static(path.join(__dirname, 'public')));

// Listening socket connection
io.on('connection', (socket) => {
	console.log('made socket connection', socket.id);

	// 'data' is whatever we are sending from the client in chat.js
	socket.on('chat', (data) => {
		io.sockets.emit('chat', data)
	})

	// listening for typing message
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data)
	})
})

// Listening port
server.listen(port, () => console.log(`Server listening on port ${port}`))

