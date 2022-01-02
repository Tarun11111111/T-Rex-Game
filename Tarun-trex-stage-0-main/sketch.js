var ground2
var trex, trexImg
var ground, groundImg
var cloud
var cloudimg
var cactus
var o1,o2,o3,o4,o5,o6
var rand
var score=0
var cloudgrp
var cactusgrp
var gameState="play"
var trexdie
var gameover,restart
var g,r
var jsound
var dsound
var csound

function preload(){
  groundImg=loadImage("ground2.png")
trexImg = loadAnimation("trex1.png", "trex3.png", "trex4.png")
cloudimg = loadImage("cloud.png")
o1=loadImage("obstacle1.png")
o2=loadImage("obstacle2.png")
o3=loadImage("obstacle3.png")
o4=loadImage("obstacle4.png")
o5=loadImage("obstacle5.png")
o6=loadImage("obstacle6.png") 
trexdie=loadAnimation('trex_collided.png')
g=loadImage("gameOver.png")
r=loadImage("restart.png")
jsound=loadSound("jump.mp3")
dsound=loadSound("die.mp3")
csound=loadSound("checkpoint.mp3")

}
function setup(){
  createCanvas(600,200)
  
  trex = createSprite(50,120,20,20)
  trex.addAnimation("trexrunning",trexImg )
  trex.addAnimation("trexdead",trexdie)
  ground=createSprite(300,180,600,10)
  ground2=createSprite(300,190,600,10)
  ground.addImage("ground",groundImg)
  trex.scale=0.8
  
  c=createSprite(600,random(10,100),20,20)
  c.velocityX=-2
  c.addImage("cloud",cloudimg)
  cloudgrp=new Group()
  cactusgrp=new Group()
  ground2.visible=false
  gameover=createSprite(300,100,10,10)
  restart=createSprite(300,150,10,10)
  gameover.addImage("Game Over",g)
  restart.addImage("Restart",r)
  gameover.visible=false
  restart.visible=false
  gameover.scale=0.7
  restart.scale=0.7
}

function draw(){
  background('white')
  trex.velocityY=trex.velocityY+0.5
  trex.collide(ground2)
 
  text("score="+score,10,20)

  if(gameState==="play"){
    if(keyDown("space")&&trex.y>140){
      trex.velocityY=-10
      jsound.play()

    }
    ground.velocityX=-3

    if(ground.x<0){
      ground.x=1000

    }
    clouds()
    cacti()
    score=score+Math.round(getFrameRate()/60)
    if(trex.isTouching(cactusgrp)){
      gameState="end"
      dsound.play()
    }
    if(score%100===0&&score>0){
      csound.play()

    }
  }
  else if(gameState==="end"){
   ground.velocityX=0
   cloudgrp.setVelocityXEach(0)
   c.velocityX=0
   trex.velocityY=0
   trex.changeAnimation("trexdead",trexdie)
   cactusgrp.setVelocityXEach(0)
   cactusgrp.setLifetimeEach(-1)
   cloudgrp.setLifetimeEach(-1)
  gameover.visible=true
  restart.visible=true
  if(keyDown("enter")){
resetgame()
  }
  }
  trex.debug=false
  trex.setCollider("circle",0,0,40)
  drawSprites()
}


function clouds(){
  
  if(frameCount%100===0){
    cloud=createSprite(600,50,20,20)
    cloud.addImage("cloud",cloudimg)
    cloud.velocityX=-2
    cloud.y=random(10,100)
    trex.depth=cloud.depth
    trex.depth=trex.depth+1
    cloud.lifetime=330
    cloudgrp.add(cloud)
  }
  
}
function cacti(){
  
  if(frameCount%60===0){
    cactus=createSprite(610,160,10,10)
    if(cactus.velocityX<21){
      cactus.velocityX=-(5+3*score/100)
    }
rand=Math.round(random(1,6))
switch(rand){
  case 1:cactus.addImage("c1",o1)
  break
  case 2:cactus.addImage("c2",o2)
  break
  case 3:cactus.addImage("c3",o3)
  break
  case 4:cactus.addImage("c4",o4)
  break
  case 5:cactus.addImage("c5",o5)
  break
  case 6:cactus.addImage("c6",o6)
  break
}
cactus.scale=0.7
cactus.lifetime=150
cactusgrp.add(cactus)
  }
}

function resetgame(){
  gameState="play"
  cactusgrp.destroyEach()
  cloudgrp.destroyEach()
  c.destroy()
  gameover.visible=false
  restart.visible=false
  trex.changeAnimation("trexrunning",trexImg)
  score=0
}




