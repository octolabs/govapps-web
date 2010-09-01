function initHighlightsScroll() {
    var wndo = new dw_scrollObj('wn', 'lyr1', 't1');
    wndo.setUpScrollControls('scrollLinksleft');
    wndo.setUpScrollControls('scrollLinksright');
}

// if code supported, link in the style sheet and call the init function onload
if ( dw_scrollObj.isSupported() ) {
    //dw_writeStyleSheet('css/scroll.css');
    dw_Event.add( window, 'load', initHighlightsScroll);
}

