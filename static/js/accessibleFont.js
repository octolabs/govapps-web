// JavaScript Document
// This javascript handles text resizing for accessibility.
function changeFontSize(newSize) {
	if(document.getElementById('resizeSection')) {
	   var p = document.getElementById('resizeSection').getElementsByTagName("p");
	   for(i=0;i<p.length;i++) {
		  p[i].style.fontSize = newSize
	   } //end of for
	   var p = document.getElementById('resizeSection').getElementsByTagName("li");
	   for(i=0;i<p.length;i++) {
		  p[i].style.fontSize = newSize
	   } //end of for
	} //end of if
}