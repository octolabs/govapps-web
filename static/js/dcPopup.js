DC.popup = {
	
	Dom : YAHOO.util.Dom,

	doPopup : function( sPopupId ) {
		this._closeAllPopups();
		
		var elePopup = this.Dom.get( sPopupId );
		this.Dom.removeClass( elePopup, "dcHidden" );
	},
	
	doClose : function( eleCloseButton ) {
	
		var elePopup = this.Dom.getAncestorByClassName( eleCloseButton, "dcPopup" );
		this.Dom.addClass( elePopup, "dcHidden" );
	
	},
	
	doCloseId : function( sPopupId ) {
	
		var elePopup = this.Dom.get( sPopupId );
		this.Dom.addClass( elePopup, "dcHidden" );
	
	},
	
	_closeAllPopups : function() {
		var elePopups = this.Dom.getElementsByClassName("dcPopup");
		
		for( var x=0; x < elePopups.length; x++ ) {
			this.Dom.addClass( elePopups[x], "dcHidden" ); 
		}
	}
	
}