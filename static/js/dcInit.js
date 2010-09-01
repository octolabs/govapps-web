var DC = {};

DC.doNothing = function(e) {

	YAHOO.util.Event.preventDefault(e);
/*
	try {
		YAHOO.util.Event.stopEvent( YAHOO.util.Event.getEvent(e) );
	} catch (err) {
		return false;
		// do nothing
	}
	*/
	return false;
}

/** Image hover effect.
*	Relies on naming convention of img.jpg, img_over.jpg
*	and assumes eImg.src already set.
*/
DC.doImageOn = function(eImg) {

	var sImg = DC._getImgPathAndBase(eImg.src) + "_over." + DC._getImgExt(eImg.src);
	eImg.src = sImg;
	
}

DC.doImageOff = function(eImg) {
	var sImg = DC._getImgPathAndBase(eImg.src) + "." + DC._getImgExt(eImg.src);
	eImg.src = sImg;
}

DC._getImgExt = function(sImg) {
	var iDot = sImg.lastIndexOf(".");
	return sImg.substring(iDot+1, sImg.length);
}


DC._getImgPathAndBase = function(sImg) {
	
	var iSlash = sImg.lastIndexOf("/");
	var iDot = sImg.lastIndexOf(".");
	var iU = sImg.lastIndexOf("_");
	var iEnd = (iU > iSlash) ? iU : iDot; // only interested in _ if in the img name, not path
	
	return sImg.substr(0,iEnd);
}

