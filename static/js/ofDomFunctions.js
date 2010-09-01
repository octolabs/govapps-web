function getParent(e,tagName) {
  while (e != null) {
   if (e.tagName.toLowerCase() == tagName.toLowerCase()){
    return e;
	}
   e = e.parentNode;
  }
  return null;
}

function getChildren(e) {
     var aChildNodes = [];
     for(var i=0, oNode; oNode = e.childNodes[i]; i++){
          if(oNode.nodeType == 1){
               aChildNodes.push(oNode);
          }
     }
     return aChildNodes;
}