var express = require('express');

var app = express();

var server = require('http').Server(app);

const io = require('socket.io').listen(server);

var playCount=0;

var px,py;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

  res.sendFile(__dirname + '/index.html');

});

io.on("connection", socket=>{

  playCount++

  socket.emit('hola',playCount)

  socket.on('jugador1Gana',()=>{
    socket.broadcast.emit('jugador1HaGanado');
    socket.emit('jugador1HaGanado');
  });

  socket.on('jugador2Gana',()=>{
    socket.broadcast.emit('jugador2HaGanado');
    socket.emit('jugador2HaGanado');
  });

  socket.on('generarEstrella1',()=>{
    px=Math.random()*900;
    py=Math.random()*900;
    socket.broadcast.emit('generando1',{px:px,py:py});
    socket.emit('generando1',{px:px,py:py});
  } );
  
  socket.on('generarEstrella2',()=>{
    px=Math.random()*900;
    py=Math.random()*900;
    socket.broadcast.emit('generando2',{px:px,py:py});
    socket.emit('generando2',{px:px,py:py});
  } );

  socket.on('generarEstrella3',()=>{
    px=Math.random()*900;
    py=Math.random()*900;
    socket.broadcast.emit('generando3',{px:px,py:py});
    socket.emit('generando3',{px:px,py:py});
  } );

  socket.on('bc',()=>{
    socket.broadcast.emit('bct');
  })
 
  socket.on('1A',()=>{
    socket.broadcast.emit('j1a');
  });

  socket.on('1B',()=>{
    socket.broadcast.emit('j1b');
  })

  socket.on('1C',()=>{
    socket.broadcast.emit('j1c');
  })

  socket.on('1D',()=>{
    socket.broadcast.emit('j1d');
  })

  socket.on('2A',()=>{
    socket.broadcast.emit('j2a');
  })

  socket.on('2B',()=>{
    socket.broadcast.emit('j2b');
  })

  socket.on('2C',()=>{
    socket.broadcast.emit('j2c');
  })

  socket.on('2D',()=>{
    socket.broadcast.emit('j2d');
  })
   
})

server.listen(4444, function () {

    console.log(`Listening on ${server.address().port}`);

});