let nodes = [];
let links = [];
let font;
diameter = 60;
buffer = 16;
aggDist = 0;
universalBoolean = true;
capTries = 200;
amount = 10;
ra= diameter/2;
touching = true;
idtemp = 0;
studtemp = 0;
Basearray = [];


function setup() {
  textSize(32);

createCanvas(710, 400);

for(let i = 0; i < amount; i++) {
    Basearray.push(i);
    }
for(let i = 0; i < amount; i++) {
    idtemp = i;
    nodes.push(new Student());
  }
  for(var i = 0; i < nodes.length; i++){
  
    touching = true;
    while(touching == true){
    touching = false;
    for(var j = 0; j<nodes.length; j++){
    if(nodes[i].intersect(nodes[j]) && i != j){
     touching = true;
   }
   }
   if(touching == true){
   nodes[i].x = random(ra,width-ra);
   nodes[i].y = random(ra,height-ra);
   }
   }
   nodes[i].display();
  }
  for (let i = 0; i < nodes.length; i++) {
    for(var j2=0;j2<nodes[i].nfriends.length;j2++){
      var contains = false;
      if(nodes[i].nlinks.indexOf(nodes[i].nfriends[j2]) == -1){
        links.push(new Link(i,nodes[i].nfriends[j2]));
      }
    }
  }
  fill(0);
  getDist();
  text(aggDist,width-90,height-40);
}


function draw(){

}

class Student {
  constructor(){
    this.id = idtemp;
    this.x = random(ra,width-ra);
    this.y = random(ra,height-ra);
    this.nlinks = [];
    this.list = Basearray.slice();
    this.list.splice(this.id,1);
    this.nfriends = [random(this.list)];
    this.list.splice(this.list.indexOf(this.nfriends[0]),1);
    this.nfriends.push(random(this.list));
  }

  display(){
    textSize(32);
    fill(255);
    ellipse(this.x, this.y, diameter, diameter);
        fill(0);
    text(str(this.id),this.x,this.y);
  }
  intersect(b) {
    let distance = dist(this.x, this.y, b.x, b.y); 

    // Compare distance to sum of radii
    if (distance < diameter+buffer) {
      return true;
    } else {
      return false;
    }

}
}
class Link{ 
  constructor(node1,node2){
  this.start = node1;
  this.end = node2;
  nodes[node1].nlinks.push(node2);
  nodes[node2].nlinks.push(node1);
  line(nodes[node1].x,nodes[node1].y,nodes[node2].x,nodes[node2].y);
  this.distance = dist(nodes[node1].x,nodes[node1].y,nodes[node2].x,nodes[node2].y);
}

update(){ this.distance = dist(nodes[this.start].x,nodes[this.start].y,nodes[this.end].x,nodes[this.end].y);
}

display(){
 line(nodes[this.start].x,nodes[this.start].y,nodes[this.end].x,nodes[this.end].y);
}


}

function getDist(){
aggDist = 0;
for(let i = 0; i < links.length;i++){
    links[i].update();
    aggDist += links[i].distance;
 }
 aggDist = round(aggDist);
}

function keyPressed(){
if(key == " "){
  optimize();  
}


}

function optimize(){
  toChange = int(random(amount));
  diff = 0;
  newx = 0;
  oldx = nodes[toChange].x;
  oldy = nodes[toChange].y;
  tries = 0;
  newy = 0;
  getDist();
  orgDist = aggDist;
  while(diff <= 0 && tries < capTries){
   tries += 1;
   nodes[toChange].x = oldy;
   nodes[toChange].y = oldy;
   newx = random(ra,width-ra);
   newy = random(ra,height-ra);
   touching = true;
   while(touching == true){
   touching = false;
   for(var j = 0; j<nodes.length; j++){
   if(collideCheck(newx,newy,nodes[j]) && j != toChange){
   touching = true;
   }
   }
   if(touching == true){
   newx = random(ra,width-ra);
   newy = random(ra,height-ra);
   }
   }
   nodes[toChange].x = newx;
   nodes[toChange].y = newy;
   getDist();
   diff = orgDist - aggDist;
  
}
if(tries==capTries){
   nodes[toChange].x = oldx;
   nodes[toChange].y = oldy;
   getDist();
   tries = 0;
   universalBoolean = true;
   while(universalBoolean && tries < amount/2){
     tries++;
     TrySwap(toChange);
   }
   
}else{
  background(255,255,255);
  for(var i = 0; i < nodes.length; i++){
    nodes[i].display();
  }
  for(let i = 0; i < links.length;i++){
    links[i].display();
 }
   text(aggDist,width-90,height-40);
}
}

function collideCheck(x,y,b) {
    let distance = dist(x, y, b.x, b.y); 

    // Compare distance to sum of radii
    if (distance < diameter+buffer) {
      return true;
    } else {
      return false;
    }

}

function TrySwap(init){
  
  orD = aggDist;
  swap = int(random(amount));
  while(swap == init){
  swap = int(random(amount));
  }
  initx = nodes[init].x;
  inity = nodes[init].y;
  swapx = nodes[swap].x;
  swapy = nodes[swap].y;
  nodes[swap].x = initx;
  nodes[swap].y = inity;
  nodes[init].x = swapx;
  nodes[init].y = swapy;
  getDist();
  if(aggDist => orD){
    nodes[swap].x = swapx;
    nodes[swap].y = swapy;
    nodes[init].x = initx;
    nodes[init].y = inity;
    getDist();
  }else{
    print("swap");
    universalBoolean = false;
     background(255,255,255);
  for(var i = 0; i < nodes.length; i++){
    nodes[i].display();
  }
  for(let i = 0; i < links.length;i++){
    links[i].display();
 }
   text(aggDist,width-90,height-40);
  }
  
}
