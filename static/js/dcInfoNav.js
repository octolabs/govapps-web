DC.infoNav = {

	Dom : YAHOO.util.Dom,

	doItemOver : function( ele ) {
	
		this.Dom.addClass( ele, "dcSelected" );
		
	},
	
	doItemOut : function( ele ) {
		
		this.Dom.removeClass( ele, "dcSelected" );
		
	}
}

