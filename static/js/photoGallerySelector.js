// JavaScript Document
<!-- Octo 1.0 -->
//JavaScript Document

var aSlideShow;

function oslideshow() {
this.cfeatured = 0;
this.featured = new Array();
advance = true;
var container = document.getElementById("featureRotator");
if( container != null ) {
	this.featured = container.getElementsByTagName("span");
}

setTimeout( "aSlideShow.flip()", 8000);
} //end of oslideshow
oslideshow.prototype.flip=function()
{
	if( this.featured.length > 0 && advance) {
		this.featured[this.cfeatured].style.display="none";
		++this.cfeatured;
		if(this.cfeatured>=this.featured.length) this.cfeatured=0;
		this.featured[this.cfeatured].style.display="block";
		setTimeout( "aSlideShow.flip()", 8000);
	}

} //end of flip
oslideshow.prototype.next=function()
{
	advance = false;
	if( this.featured.length > 0) {
		this.featured[this.cfeatured].style.display="none";
	}
	if(this.cfeatured >= this.featured.length-1) {
		this.cfeatured=0;
	} //end if
	else {
		this.cfeatured++;
	} //end of else
	this.featured[this.cfeatured].style.display="block";
	return false;
} //end of next
oslideshow.prototype.previous=function()
{
	advance = false;
	if( this.featured.length > 0) {
		this.featured[this.cfeatured].style.display="none";
	}
	if(this.cfeatured <= 0) {
		this.cfeatured=this.featured.length-1;
	} //end if
	else {
		this.cfeatured--;
	} //end of else
	this.featured[this.cfeatured].style.display="block";
	return false;
} //end of previous
oslideshow.prototype.showSlide=function(newSlideNumber)
{
	advance = false;
	if( newSlideNumber > 0 && newSlideNumber <= this.featured.length) {
		newSlideNumber--;
		this.featured[this.cfeatured].style.display="none";
		this.cfeatured = newSlideNumber;
		this.featured[this.cfeatured].style.display="block";
	}
	return false;
} //end of next
function init() {
	aSlideShow = new oslideshow;
} //end of init