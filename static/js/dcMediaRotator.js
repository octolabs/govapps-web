// JavaScript Document
<!-- Octo 1.4 -->
// vars and functions for index2 page and image gallery
var num_recs = 4;
var delay = 8000;
var first = 0;
var slideTimerId = 0;

function changeSlideAuto(div_count) {
	if(num_recs > 1) {
		if (div_count >= num_recs) {
			div_count=1;
		}
		else {
			div_count++;
		}
		if (first != 0) {
			changeSlide(div_count);
		}
		else {
			first = 1;
		}
		
		slideTimerId = setTimeout("changeSlideAuto('"+div_count+"')",delay);
	}
}

function changeSlide(number){
	if(number == 1) {
		clearTimeout ( slideTimerId );
		document.getElementById('rotatorImg').innerHTML = "<img src='img/dcps/photo_main.jpg' border='0' alt='main photo' title='main photo' />";
		document.getElementById('rotatorTitle').innerHTML = "Rediscover <br/>DC Public Schools!";
		document.getElementById('rotatorDescr').innerHTML = "Now is the time to learn more about District of Columbia Public Schools<br/>- a quality public education option. Explore all the specialized schools and the programs we have to offer.";
	} //end of rotate 1
	if(number == 2) {
		clearTimeout ( slideTimerId );
		document.getElementById('rotatorImg').innerHTML = "<img src='img/dcps/photo_main2.jpg' border='0' alt='main photo' title='main photo' />";
		document.getElementById('rotatorTitle').innerHTML = "This is title 2";
		document.getElementById('rotatorDescr').innerHTML = "This is description 2";
	} //end of rotate 1
	if(number == 3) {
		clearTimeout ( slideTimerId );
		document.getElementById('rotatorImg').innerHTML = "<img src='img/dcps/photo_main3.jpg' border='0' alt='main photo' title='main photo' />";
		document.getElementById('rotatorTitle').innerHTML = "This is title 3";
		document.getElementById('rotatorDescr').innerHTML = "This is description 3";
	} //end of rotate 1
	if(number == 4) {
		clearTimeout ( slideTimerId );
		document.getElementById('rotatorImg').innerHTML = "<img src='img/dcps/photo_main4.jpg' border='0' alt='main photo' title='main photo' />";
		document.getElementById('rotatorTitle').innerHTML = "This is title 4";
		document.getElementById('rotatorDescr').innerHTML = "This is description 4";
	} //end of rotate 1
}