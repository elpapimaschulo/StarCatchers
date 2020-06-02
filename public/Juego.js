var config = {
  type: Phaser.AUTO,
  width: 953,
  height: 953,
  physics: {
      default: 'arcade',
      arcade: {
         
          debug: false
      }
  },
  scene: [{
      preload: preload,
      create: create,
      update: update
  }]
};
var game = new Phaser.Game(config);
var scoreText;
var score=0;
var star1;
var star2;
var star3;
var bc = false;
const velocidad = 200;
var arriba,derecha,izquierda,abajo;
var jugador1;
var jugador2;
var perso;

const socket = io();

//Asigna si eres jugador 1 o 2
socket.on('hola', data=>{
    perso = data;
    if(perso>1){
        bc=true;
        socket.emit('bc');
    }
});
//Verifica que hallan dos jugadores conectados
socket.on('bct',()=>{
    bc=true;
})


function preload() {

    this.load.spritesheet('player', 
    'Assets/player.png',
    { frameWidth: 40, frameHeight: 54 }   
    );

    this.load.spritesheet('player2', 
    'Assets/player2.png',
    { frameWidth: 40, frameHeight: 54 }
    );

    this.load.spritesheet('Estrella', 
    'Assets/Estrella.png',
    { frameWidth: 32, frameHeight: 32 }
    );
   
    this.load.image("Cesped","Assets/Cesped.png")
}
    
function create() {


    this.add.image(476.5,476.5,"Cesped");

    star1 = this.physics.add.sprite(150,500,"Estrella");
    star2 = this.physics.add.sprite(500,500,"Estrella");
    star3 = this.physics.add.sprite(953-150,500,"Estrella");
    this.anims.create({
        key: "mov",
        frames: this.anims.generateFrameNumbers("Estrella", { start: 0, end: 1 }),
        frameRate: 10
    });

    scoreText = this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
   
    jugador1 = this.physics.add.sprite(853,100,"player2",0);
    jugador1.setCollideWorldBounds(true);
    this.anims.create({
        key: "caminarA",
        frames: this.anims.generateFrameNumbers("player2", { start: 0, end: 4 }),
        frameRate: 15
    });
    this.anims.create({
        key: "caminarB",
        frames: this.anims.generateFrameNumbers("player2", { start: 5, end: 9 }),
        frameRate: 15
    });
    this.anims.create({
        key: "caminarC",
        frames: this.anims.generateFrameNumbers("player2", { start: 10, end: 14 }),
        frameRate: 15
    });
    this.anims.create({
        key: "caminarD",
        frames: this.anims.generateFrameNumbers("player2", { start: 15, end: 19 }),
        frameRate: 15
    });
   
  
    jugador2 = this.physics.add.sprite(100,100,"player",0);
    jugador2.setCollideWorldBounds(true);
    this.anims.create({
        key: "caminarA1",
        frames: this.anims.generateFrameNumbers("player", { start: 0, end: 4 }),
        frameRate: 15
    });
    this.anims.create({
        key: "caminarB1",
        frames: this.anims.generateFrameNumbers("player", { start: 5, end: 9 }),
        frameRate: 15
    });
    this.anims.create({
        key: "caminarC1",
        frames: this.anims.generateFrameNumbers("player", { start: 10, end: 14 }),
        frameRate: 15
    });
    this.anims.create({
        key: "caminarD1",
        frames: this.anims.generateFrameNumbers("player", { start: 15, end: 19 }),
        frameRate: 15
    });

    this.physics.add.collider(jugador1,jugador2);
    this.physics.add.overlap(jugador1, star1, collectStar1A, null, this);
    this.physics.add.overlap(jugador1, star2, collectStar1B, null, this);
    this.physics.add.overlap(jugador1, star3, collectStar1C, null, this);
    this.physics.add.overlap(jugador2, star1, collectStar2A, null, this);
    this.physics.add.overlap(jugador2, star2, collectStar2B, null, this);
    this.physics.add.overlap(jugador2, star3, collectStar2C, null, this);
    
   
    

    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
 
}


function collectStar1A(){
    if(perso==1){
    score=score+1;
    scoreText.destroy();
    scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    socket.emit('generarEstrella1');
    socket.on('generando1', data=>{
        star1.y=data.py;
        star1.x=data.px;
    })
}

function collectStar2A(){
    if(perso==2){
    score=score+1;
    scoreText.destroy();
    scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    socket.emit('generarEstrella1');
    socket.on('generando1', data=>{
        star1.y=data.py;
        star1.x=data.px;
    })
}

function collectStar1B(){
    if(perso==1){
    score=score+1;
    scoreText.destroy();
    scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    socket.emit('generarEstrella2');
    socket.on('generando2', data=>{
        star2.y=data.py;
        star2.x=data.px;
    })
}

function collectStar2B(){
    if(perso==2){
    score=score+1;
    scoreText.destroy();
    scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    socket.emit('generarEstrella2');
    socket.on('generando2', data=>{
        star2.y=data.py;
        star2.x=data.px;
    })
}

function collectStar1C(){
    if(perso==1){
    score=score+1;
    scoreText.destroy();
    scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    socket.emit('generarEstrella3');
    socket.on('generando3', data=>{
        star3.y=data.py;
        star3.x=data.px;
    })
}

function collectStar2C(){
    if(perso==2){
    score=score+1;
    scoreText.destroy();
    scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
    }

    socket.emit('generarEstrella3');
    socket.on('generando3', data=>{
        star3.y=data.py;
        star3.x=data.px;
    })
}

function update() {   
    
    
    if(bc){

        if(score==-1){
            score=0;
            scoreText.destroy();
            scoreText=this.add.text(16, 16, 'score: '+score, { fontSize: '32px', fill: '#000' });
        }
        

        star1.anims.play("mov",true);
        star2.anims.play("mov",true);
        star3.anims.play("mov",true);

        jugador1.body.setVelocityX(0);
        jugador1.body.setVelocityY(0);
        
        jugador2.body.setVelocityX(0);
        jugador2.body.setVelocityY(0);
    
        if (perso==1){

        if(izquierda.isDown){
            socket.emit('1B'); 
            jugador1.body.setVelocityX(-velocidad);
            jugador1.anims.play("caminarB",true);
        }
    
        if(derecha.isDown){
            socket.emit('1C'); 
            jugador1.body.setVelocityX(velocidad);
            jugador1.anims.play("caminarC",true);
        }
    
        if(arriba.isDown){
            socket.emit('1D'); 
            jugador1.body.setVelocityY(-velocidad);
            jugador1.anims.play("caminarD",true);
        }
    
        if(abajo.isDown){
            socket.emit('1A');
            jugador1.body.setVelocityY(velocidad);
            jugador1.anims.play("caminarA",true); 
        }  
        socket.on('j2a',()=>{
            jugador2.body.setVelocityY(velocidad);
            jugador2.anims.play("caminarA1",true);
        });
    
        socket.on('j2b',()=>{
            jugador2.body.setVelocityX(-velocidad);
            jugador2.anims.play("caminarB1",true);  
        });
    
        socket.on('j2c',()=>{
            jugador2.body.setVelocityX(velocidad);
            jugador2.anims.play("caminarC1",true);
        });
    
        socket.on('j2d',()=>{
            jugador2.body.setVelocityY(-velocidad);
            jugador2.anims.play("caminarD1",true);
        }); 

        if(score==10){
            socket.emit('jugador1Gana')
        }

        }
    
        if (perso==2){

        if(izquierda.isDown){
            socket.emit('2B'); 
            jugador2.body.setVelocityX(-velocidad);
            jugador2.anims.play("caminarB1",true);  
        }
        
        if(derecha.isDown){
            socket.emit('2C'); 
            jugador2.body.setVelocityX(velocidad);
            jugador2.anims.play("caminarC1",true);
        }
        
        if(arriba.isDown){
            socket.emit('2D'); 
            jugador2.body.setVelocityY(-velocidad);
            jugador2.anims.play("caminarD1",true);
        }
        
        if(abajo.isDown){
            socket.emit('2A'); 
            jugador2.body.setVelocityY(velocidad);
            jugador2.anims.play("caminarA1",true);
        }
        socket.on('j1a',()=>{
            jugador1.body.setVelocityY(velocidad);
            jugador1.anims.play("caminarA",true);
        });
    
        socket.on('j1b',()=>{
            jugador1.body.setVelocityX(-velocidad);
            jugador1.anims.play("caminarB",true);  
        });
    
        socket.on('j1c',()=>{
            jugador1.body.setVelocityX(velocidad);
            jugador1.anims.play("caminarC",true);
        });
    
        socket.on('j1d',()=>{
            jugador1.body.setVelocityY(-velocidad);
            jugador1.anims.play("caminarD",true);
        });

        if(score==10){
            socket.emit('jugador2Gana')
        }
        
        }

        if(perso == 3){
            jugador1.disableBody(true, true);
            jugador2.disableBody(true, true);
        }
    

    }else{
        alert('esperando por player 2')
    }


}

socket.on('jugador1HaGanado',()=>{
    if(perso==1){
        score=-1;
        alert('HAS GANADO!!')
        jugador1.y=100
        jugador1.x=853
        jugador2.x=100
        jugador2.y=100
        star1.y=500;
        star1.x=150;
        star2.y=500;
        star2.x=500;
        star3.y=500;
        star3.x=953-150;
        jugador1.body.setVelocityX(0);
        jugador1.body.setVelocityY(0);
        
        jugador2.body.setVelocityX(0);
        jugador2.body.setVelocityY(0);

    }else{
        score=-1;
        alert('HAS PERDIDO!!')
        jugador1.y=100
        jugador1.x=853
        jugador2.x=100
        jugador2.y=100
        star1.y=500;
        star1.x=150;
        star2.y=500;
        star2.x=500;
        star3.y=500;
        star3.x=953-150;
        jugador1.body.setVelocityX(0);
        jugador1.body.setVelocityY(0);
        
        jugador2.body.setVelocityX(0);
        jugador2.body.setVelocityY(0);

    }
})

socket.on('jugador2HaGanado',()=>{
    if(perso==2){
        score=-1;
        alert('HAS GANADO!!')
        jugador1.y=100
        jugador1.x=853
        jugador2.x=100
        jugador2.y=100
        star1.y=500;
        star1.x=150;
        star2.y=500;
        star2.x=500;
        star3.y=500;
        star3.x=953-150;
        jugador1.body.setVelocityX(0);
        jugador1.body.setVelocityY(0);
        
        jugador2.body.setVelocityX(0);
        jugador2.body.setVelocityY(0);
    }else{
        score=-1;
        alert('HAS PERDIDO!!')
        jugador1.y=100
        jugador1.x=853
        jugador2.x=100
        jugador2.y=100
        star1.y=500;
        star1.x=150;
        star2.y=500;
        star2.x=500;
        star3.y=500;
        star3.x=953-150;
        jugador1.body.setVelocityX(0);
        jugador1.body.setVelocityY(0);
        
        jugador2.body.setVelocityX(0);
        jugador2.body.setVelocityY(0);
    }
})
