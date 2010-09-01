DC.topNav = {

	Dom : YAHOO.util.Dom,

	doImageOver : function( eLi ) {
	
		if( this.Dom.hasClass( eLi, "dcSelected" ) ) {
			return; // do nothing b/c this is the active "tab"
		} else {
			DC.doImageOn( this._getImg( eLi ) );	
		}
		
	},
	
	doImageOut : function( eLi ) {
		
		if( this.Dom.hasClass( eLi, "dcSelected" ) ) {
			return; // do nothing b/c this is the active "tab"
		} else {
			DC.doImageOff( this._getImg( eLi ) );	
		}
		
	},
	
	/** find child img tag */
	_getImg : function( eLi ) {
		 return this.Dom.getElementsBy( function(){return true}, "img", eLi )[0]; 
	},
	
	
	
	doJumpMenu : function( eListBox ) {
		var url = eListBox.options[eListBox.options.selectedIndex].value;
		if(url != "") {
			window.location = url;
		}
	}

}