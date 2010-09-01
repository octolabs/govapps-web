/*
@depends ofClassFunctions.js
@depends ofDom.js
@depends x_core.js
@depends prototype.js
*/


function switchTab(e){
	theEle = getParent(e,'LI');
	theUL = getParent(theEle,'UL');
	theLIs = getChildren(theUL);
	for (i=0; i<theLIs.length; i++){
		removeClass(theLIs[i],"ofSelected");
		removeClass(theLIs[i],"ofSelectedAndOfFirstChild");
	}
	addClass(theEle,"ofSelected");
	
	if (window.ActiveXObject){
		if (hasClass (theEle,"ofFirstChild")) {
			addClass(theEle,"ofSelectedAndOfFirstChild");
		}
	}
				
	sizeTabObjects();
}

function switchTabParent(e){
	childDiv = getChildren(e);
	aTag = getChildren(childDiv[0]);
	switchTab(aTag[0]);
}

function sizeTabObjects(){ // Sets the height and width
	theTabObjects = document.getElementsByClassName("ofTabRounded");
	for (j=0; j<theTabObjects.length; j++){
		if (hasClass(theTabObjects[j],"ofLastChild")){ // accommodate ofLastChild spacing on bottom
		offSet = 12;
	}else{
		offSet = 36;
	}
	theUL = getChildren(theTabObjects[j]);
	theLIs = getChildren(theUL[0]);
	for (i=0; i<theLIs.length; i++){
		if (hasClass(theLIs[i],"ofSelected")){
			theLIchildren = getChildren(theLIs[i]);
			theContentObjects = theLIchildren[1];
			theTabObjects[j].style.height = xHeight(theContentObjects) + offSet + "px"; // sets height
		}
	}
}

setAutoWidthObjectWidths() // sets width
}

function getParentGridWidthSize(e) {
 if(null==e) return null;
 if (e.className!=null && e.className.indexOf("ofGridWidth") > -1 && e.className.indexOf("ofGridWidthAuto") == -1){
   
   a_test = getClassProperty(e,"width");
    // fix Opera
    if (window.opera) {
    a_test = a_test-20;
    }
   return a_test;
   
 } else {
   if(e.parentNode!=null) return getParentGridWidthSize(e.parentNode);
   else {
    // since no we're at the top of the DOM and our class wasn't found, assume that we should use the entire screen width  
    return xClientWidth();
   }
 }
}


function setAutoWidthObjectWidths(){ // Sets width of anything with an ofGridWidthAuto to width of the containing ofGridWidth# class
	theAutoWidthObjects = document.getElementsByClassName("ofGridWidthAuto");
	for (i=0; i<theAutoWidthObjects.length; i++){
		theAutoWidthObjects[i].style.width = getParentGridWidthSize(theAutoWidthObjects[i]);
	}
}

