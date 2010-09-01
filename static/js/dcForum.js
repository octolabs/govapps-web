DC.forum = {
	
	Dom : YAHOO.util.Dom,
	
	toggleMinMax : function( eleSomewhereInThread ) {
		YAHOO.util.Event.stopEvent( YAHOO.util.Event.getEvent() );
	
		var eleThread = this._getThreadRootEle( eleSomewhereInThread );
		
		if( this.Dom.hasClass( eleThread, "dcMinView" ) ) {
			this.doMax( eleThread );
		} else {
			this.doMin( eleThread );
		}
	
	}, 

	doMax : function( eleThread ) {
			
		this.Dom.removeClass( eleThread, "dcMinView" );
		var eleMinMax = this._getMinMaxButton( eleThread );
		eleMinMax.src = "img/mydc/contract_but.gif";		
				
		var eleMin = this.Dom.get("eleMinAll");
		this.Dom.removeClass( eleMin, "dcDisabled" );
			
			
		/*var elesHidden = this.Dom.getElementsByClassName( "dcHidden", null, eleThread );		
		for( var x=0; x < elesHidden.length; x++ ) {
			this.Dom.removeClass( elePopups[x], "dcHidden" ); 
		}
		
		var eleAvatarMin = this.Dom.getElementsByClassName( "dcAvatarMin", null, eleThread )[0];
		this.Dom.addClass( elePopups[x], "dcHidden" );
		
		this._swapAvatar( eleThread );
		*/
						
	},
	
	doMin : function( eleThread ) {
	
		this.Dom.addClass( eleThread, "dcMinView" );		
		var eleMinMax = this._getMinMaxButton( eleThread );
		eleMinMax.src = "img/nondcps/expandgray_but.gif";
		
		this._populateMinimizedContent( eleThread );	
		
		var eleMax = this.Dom.get("eleMaxAll");				
		this.Dom.removeClass( eleMax, "dcDisabled" );
			
	
		/*this._hideEles( eleThread );*/
	
	},
	
	doMaxAll : function() {
		YAHOO.util.Event.stopEvent( YAHOO.util.Event.getEvent() );
	
		var eleThreads = this.Dom.getElementsByClassName( "dcSubPost" );
		
		for(var x=0; x<eleThreads.length; x++) {
			this.doMax( eleThreads[x] );
		}
		
		var eleMax = this.Dom.get("eleMaxAll");
		var eleMin = this.Dom.get("eleMinAll");
		
		this.Dom.addClass( eleMax, "dcDisabled" );
		this.Dom.removeClass( eleMin, "dcDisabled" );	
	
	},
	
	doMinAll : function() {
		YAHOO.util.Event.stopEvent( YAHOO.util.Event.getEvent() );
		
		var eleThreads = this.Dom.getElementsByClassName( "dcSubPost" );
		
		for(var x=0; x<eleThreads.length; x++) {
			this.doMin( eleThreads[x] );
		}
		
		var eleMax = this.Dom.get("eleMaxAll");
		var eleMin = this.Dom.get("eleMinAll");
		
		this.Dom.removeClass( eleMax, "dcDisabled" );
		this.Dom.addClass( eleMin, "dcDisabled" );		
	
	},
		
	_getThreadRootEle : function( eleDescendant ) {
		return this.Dom.getAncestorByClassName(eleDescendant, "dcSubPost");
	},
	
	_getAllSubPostRootEles : function() {
		return this.Dom.getElementsByClassName("dcSubPost");
	},
		
	_getContentCharsForMin : function(eleP) {
		var len = 130;
		var txtClose = "....";
		var txtFull = eleP.innerHTML;
		
		var txtMin = txtFull.substring( 0, len ) + txtClose;
		
		return txtMin;
	},
	
	/** @deprecated for CSS */
	_hideEles : function( eleThread ) {
		this._hideSummaryDetails( eleThread );
		this._hideP( eleThread );
		this._hideActionBar( eleThread );
		// todo: create P with short text
	},
	
	/** @deprecated for CSS */
	_hideP : function( eleThread ) {
		var eles = document.getElementsByName("P");
		
		for(var x=0; x<eles.length; x++) {
			this.Dom.addClass(eles[x], "dcHidden");
		}
	},
	
	/** @deprecated for CSS */
	_hideSummaryDetails : function( eleThread ) {
		var ele = this.Dom.getElementsByClassName("dcForumSummaryDetails", null, eleThread)[0];
		this.Dom.addClass( "dcHidden" );	
	},
	
	/** @deprecated for CSS */
	_hideActionBar : function( eleThread ) {
		var ele = this.Dom.getElementsByClassName("dcActionBar", null, eleThread)[0];
		this.Dom.addClass( "dcHidden" );
	},
	
	/** @deprecated for CSS */
	_swapAvatar : function( eleThread ) {
		/* not implemented */
	},
	
	_getAvatarMax : function ( eleThread ) {
		
		var isAvatarMax = function(ele) {
			var isAvatar = this.Dom.hasClassName("dcAvatar");
			var isAvatarMin = this.Dom.hasClassName("dcAvatarMin");
		
			if(isAvatar && !isAvatarMin) {
				return ele;
			}
		}
		
		var ele = this.Dom.getElementsBy( isAvatarMax, null, eleThread )[0];
		return ele;
	},
	
	_getAvatarMin : function ( eleThread ) {
		return this.Dom.getElementsByClassName( "dcAvatarMin", null, eleThread )[0];	
	},
	
	_getMinMaxButton : function ( eleThread ){
		return this.Dom.getElementsByClassName( "dcIconButton", null, eleThread )[1];
	},
	
	_populateMinimizedContent : function ( eleThread ) {
		var elePMin = this.Dom.getElementsByClassName( "dcContentMin", null, eleThread )[0];
		var eleP1 = this.Dom.getElementsByClassName( "dcFirstP", null, eleThread )[0];
		elePMin.innerHTML = this._getContentCharsForMin( eleP1 );
	},
	
	/** icon state only */
	doExpandOn : function( eleThreadRoot ) {
			
		if( this.Dom.hasClass( eleThreadRoot, "dcMinView" ) ) {
			var img = this.Dom.getElementsByClassName( "dcIconButton", "IMG", eleThreadRoot )[0];
			img.src = "img/mydc/expand_but.gif";
		}		
	},
	
	/** icon state only */
	doExpandOff : function( eleThreadRoot ) {
		if( this.Dom.hasClass( eleThreadRoot, "dcMinView" ) ) {
			var img = this.Dom.getElementsByClassName( "dcIconButton", "IMG", eleThreadRoot )[0];
			img.src = "img/nondcps/expandgray_but.gif";
		}
	}
	
};