var orbs;
var ang = 0;
var sizeMul;

function setup() {
    createCanvas(1000,1000);
    orbs = [];
    rectMode(CENTER);
    
    
//    for(var i =0; i <100; i++){
//      orbs.push(new Orb());
//    }
    //console.log(mouseX,mouseY);
}

function draw() {
    //background(128, 206, 214,10);
    background(0,20);
    console.log(mouseX,mouseY);
    translate(mouseX,mouseY);
    rotate(ang);
    fill(255,50,200);
    rect(0,0, 100*sizeMul,100*sizeMul);     //center spinning rectangle 
    //sizeMul = map(0,0,width,.50,2);
    ang = ang+10;
    
    this.noiseStep = random(100);
    
    
  for(var i =0; i < orbs.length; i++){
      orbs[i].display();
      orbs[i].move();
      orbs[i].boundary();
      
      for(var j =i; j<orbs.length; j++){
          stroke(25);
          var interDist = dist(orbs[i].xPos, orbs[i].yPos, orbs[j].xPos, orbs[j].yPos);
          if(interDist < 250){
            stroke(random(10,200),random(50,80), random(100,220));
            //stroke(noise(this.noiseStep)*255);
          line(orbs[i].xPos, orbs[i].yPos, orbs[j].xPos, orbs[j].yPos);
          }
          if(orbs[i].collide(orbs[j]) && i != j){
              orbs[i].reverse();
              orbs[j].reverse();
          }
      }
  }
}

function Orb(x,y){
    this.xPos = x;
    this.yPos = y;
    this.sz = 10;
    this.xVel = random(-2,2);
    this.yVel = random(-2.5679,3);
    this.col = color(125,0,45);
    
    this.display= function(){
        fill(this.col);
        noStroke();
        ellipse(this.xPos,this.yPos,this.sz);   
    };
    
    this.move = function(){
        this.xPos += this.xVel;
        this.yPos += this.yVel;
    };
    
    this.boundary = function(){
//        if(this.xPos>width - this.sz/2 || this.xPos < 0 + this.sz/2){
//            //this.xVel = -this.xVel;  makes it bounce back off walls
//            this.xPos = width/2;
//            this.yPos = height/2;
//        }
//         if(this.yPos>width - this.sz/2 || this.yPos < 0 + this.sz/2){
//           // this.yVel = -this.yVel;
//            this.xPos = width/2;
//            this.yPos = height/2;
//        }
        
        if(this.xPos < 0){
            this.xPos += width;
        }
        
        if(this.xPos > width){
            this.xPos -= width;
        }
        
        if(this.yPos < 0){
            this.yPos += height;
        }
        
        if(this.yPos > height){
            this.yPos -= height;
        }
    };
    
    this.collide = function(other){
        var theDist = dist(this.xPos, this.yPos, other.xPos, other.yPos);
        if(theDist < this.sz/2 + other.sz/2){
            return true;
        }
        else{
            return false;
        }
    };
    this.reverse = function(){
            this.xVel = -this.xVel;
            this.yVel = -this.yVel;

    };
    
    this.randCol = function(){
        this.col = color(random(255), random(255), random(255));
    };
    
}

function mouseReleased(){
    orbs.push(new Orb(mouseX,mouseY));
    
    for(var i =0; i<orbs.length; i++){
        orbs[i].randCol();
    }
}

function keyTyped(){
    orbs.splice(0,1);
}