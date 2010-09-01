DC.doFlyoutSubItemOn = function(ele) {
	YAHOO.util.Dom.addClass( ele, "flyoutOn" );
}

DC.doFlyoutSubItemOff = function(ele) {
	YAHOO.util.Dom.removeClass( ele, "flyoutOn" );
}

/**
*	Show this flyout and hide others.
*	Flyout will be found as decendant of owner.
*	Other flyouts will be found by finding parent of owner, 
*	then all its children matching classname (siblings of owner),
*	then finding their flyouts just as this flyout is found.
*
*	Flyout can be disabled by having a parent ele with classname of "dcDisableFlyout"
*/
DC.doFlyoutOpen = function( eleFlyoutOwner ) {
	var Dom = YAHOO.util.Dom;
	
	// exit if flyout disabled
	var hasDisableFlag =  Dom.getAncestorByClassName( eleFlyoutOwner, "dcDisableFlyout" );
	if( typeof(hasDisableFlag)!='undefined' && hasDisableFlag!=null && hasDisableFlag!=true) {
		return false;
	}		

	var group = Dom.getAncestorByClassName( eleFlyoutOwner, "dcAccordionSubContentGroup" );	
	//var flyouts = Dom.getElementsByClassName( "dcFlyoutWrapper", null, group ); // this only closed flyouts for that accordion, not all accordions
	var flyouts = Dom.getElementsByClassName( "dcFlyoutWrapper" );
	
	for( var x=0; x<flyouts.length; x++ ) {
		Dom.removeClass( flyouts[x], "dcFlyoutOn" );		
	}
	
	var thisFlyout = Dom.getElementsByClassName( "dcFlyoutWrapper", null, eleFlyoutOwner )[0];
		
	Dom.addClass( thisFlyout, "dcFlyoutOn" );
	
	var showToRight = true;
	var foundClass = Dom.getAncestorByClassName( eleFlyoutOwner, "dcFlytoutLeft" );
	if( typeof(foundClass)!='undefined' && foundClass!=null ) showToRight = false;
	
	// set x/y. x is right of group (not parent), y is top of parent
	var parentReg = Dom.getRegion( eleFlyoutOwner );
	var groupReg = Dom.getRegion( group );
	
	Dom.setY( thisFlyout, parentReg.top );
	if(showToRight) {
		Dom.setX( thisFlyout, groupReg.right );		
	} else {
		var flyoutWidth = 228; // todo:make this dynamic approach work. currently returns 0:: Dom.getStyle( thisFlyout, "width");
		Dom.setX( thisFlyout, groupReg.left - flyoutWidth);
	}

}

DC.doFlyoutClose = function( eleFlyoutOrDescendant ) {
	
	var eleFlyout = null;
	
	try {
		if( YAHOO.util.Dom.hasClass( eleFlyoutOrDescendant, "dcFlyoutWrapper" ) ) {
			eleFlyout = eleFlyoutOrDescendant;
		} else {
			eleFlyout = YAHOO.util.Dom.getAncestorByClassName( eleFlyoutOrDescendant, "dcFlyoutWrapper" );
		}
	
		YAHOO.util.Dom.removeClass( eleFlyout, "dcFlyoutOn" );
	} catch(e) {
		// do nothing
	}
}