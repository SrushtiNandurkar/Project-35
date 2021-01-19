var dog,dogImg,dogImg1;
var database;
var foodS,foodStock;

function preload(){
   dogImg=loadImage("Images/Dog.png");
   dogImg1=loadImage("Images/happy dog.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(500,500);

  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodStock.set(20); 
}

// function to display UI
function draw() {
  background(46,139,87);
 if(foodS!== undefined){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImg1);
  }

  drawSprites();
  textSize(20);
  fill(255);
  text("Food remaining : "+foodS,170,200);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

  if(keyWentUp(UP_ARROW)){
    dog.addImage(dogImg);
  }
  
  if(foodS === 0){
    foodS = 20;
   }
  
 }
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    Food:x
  });
}