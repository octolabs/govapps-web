
function addClass(e, className){
	if (!hasClass(e, className)){
	var classString = e.className + " " + className;
	e.className = classString.replace(/^\s*|\s*$/g,''); 
	}
}  

function removeClass(e, className){
	var classString = e.className.replace(new RegExp("\\b\\s*" + className + "\\b", "g"), ""); 
	e.className = classString.replace(/^\s*|\s*$/g,'');
}

function hasClass(e, className){ 
	return (new RegExp("\\b" + className + "\\b")).test(e.className);
} 

function getClassProperty(e, sProperty){
	if(document.defaultView)	{
		return document.defaultView.getComputedStyle(e, null).getPropertyValue(sProperty);
	}	else if(e.currentStyle)	{
		var sProperty = sProperty.replace(/-\D/gi, function(sMatch)		{
			return sMatch.charAt(sMatch.length - 1).toUpperCase();
		});
		return e.currentStyle[sProperty];
	}
	else return null;
}