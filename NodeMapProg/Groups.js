function assignGroups(){
  for(var i = 0; i < nodes.length; i++){
    if(nodes[i].group == -1){
      Groups.push([[random(255),random(255),random(255)],i]);
      nodes[i].group = int(Groups.length -1);
      addFriends(int(i), (int(Groups.length -1)));
    }
    else{
       Groups[nodes[i].group].push(i);
    }
  }
  for(var cnt = 0; cnt < links.length; cnt++){
    if(nodes[links[cnt].start].group != nodes[links[cnt].end].group){
      links[cnt].col = [255,0,0];
      print(nodes[links[cnt].start].name, "and", nodes[links[cnt].end].name, "are a bad link");
    }
  }
 
  
 
}




function addFriends(index, groupnum){
  //IMPORTANT: If you wanna know what is wrong this should be called nfriends. Ok love u future me. PS. Hope the multi-file thing works, would be really handy
  for(var i = 0; i < nodes[index].nlinks.length; i++){
    if(nodes[nodes[index].nlinks[i]].group != groupnum){
       nodes[nodes[index].nlinks[i]].group = groupnum;
       stack.push(i);
       addFriends(nodes[index].nlinks[i], groupnum);
       stack.pop(i);
    }
    
  }
   
  
  
}
