DC.videoGrid = {

	Dom : YAHOO.util.Dom,

	doThumbOver : function( ele ) {
	
		this._hideAllContents();
		this._showContent( ele.id );
		
	},
	
	doThumbOut : function( ele ) {
		
		return true; // no need for any action. Only hide, when mouse over another thumb
		
	},
	
	doImageOn : function( eleImg ) {
		this._setAllImagesMouseOut();
		DC.doImageOn( eleImg );
	},
	
	/** get divs for each content piece that will be hidden */
	_getAllContents : function() {
		return this.Dom.getElementsByClassName("dcThumbContent");
	},
	
	_hideAllContents : function() {
		var groups = this._getAllContents();
		for(var x=0; x<groups.length; x++) {
			this.Dom.removeClass( groups[x], "dcSelected" );
		}
	},
	
	
	/** naming convention for binding:
	*	dcThumb_3 =to= dcThumb_3_content
	*/
	_showContent : function( fromThumbId ) {
		var sContentId = fromThumbId + "_content";
		
		this.Dom.addClass( this.Dom.get(sContentId), "dcSelected" );
	},
	
	_setAllImagesMouseOut : function() {
		var imgs = this._getAllThumbImages();
		for(var x=0; x<imgs.length; x++) {
			DC.doImageOff( imgs[x] );
		}
	},
	
	_getAllThumbImages : function() {
		return this.Dom.getElementsByClassName("dcThumbImg");
	}

}

