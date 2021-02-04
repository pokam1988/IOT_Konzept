//originally from http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
function formatCurrency(n, c, d, t) {
    "use strict";

    var s, i, j;

    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    s = n < 0 ? "-" : "";
    i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
    j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}


/**
 * Thermometer Progress meter.
 * This function will update the progress element in the "thermometer"
 * to the updated percentage.
 * If no parameters are passed in it will read them from the DOM
 *
 * @param {Number} goalAmount The Goal amount, this represents the 100% mark
 * @param {Number} progressAmount The progress amount is the current amount
 * @param {Boolean} animate Whether to animate the height or not
 *
 */
function thermometer(id, goalAmount, progressAmount, animate) {
    "use strict";

    var $thermo = $("#" + id),
        $progress = $(".progress", $thermo),
        $goal = 100, //$(".goal", $thermo),
        percentageAmount,
        isHorizontal = $thermo.hasClass("horizontal"),
        newCSS = {};

    goalAmount = 100;
    progressAmount = progressAmount || parseFloat($progress.text());
    percentageAmount =  Math.min(progressAmount, 100); //make sure we have 1 decimal point

    //let's format the numbers and put them back in the DOM
//    $goal.find(".amount").text("100%");
//    $progress.find(".amount").text(progressAmount + "%");
      $progress.find(".amount").text(progressAmount + " ");


    //let's set the progress indicator
    $progress.find(".amount").hide();

    newCSS[isHorizontal ? "width" : "height"] = percentageAmount + "%";

    if (animate !== false) {
        $progress.animate(newCSS, 1200, function () {
            $(this).find(".amount").fadeIn(500);
        });
    } else {
        $progress.css(newCSS);
        $progress.find(".amount").fadeIn(500);
    }
}





$(document).ready(function () {
    "use strict";

    //call without the parameters to have it read from the DOM
    var x = 1;
	
	$('#pmp1').click(function(){
	//	alert("envoi1");
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/3");
		
		
	});
$('#pmp2').click(function(){
	//	alert("envoi2");
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/2");
		
	});

    setInterval(function () {
      //  thermometer("thermo1", 100, x++);
	   // thermometer("thermo1", 100, 10,false);
	    
		$.get("http://192.168.240.1/data/get", function(response){
		//console.log(response);
		//$("#txtFldTemp").val(response.value.tes);
		
		
		$("#temperatureval").val(response.value.tes);
		$("#debitval").val(response.value.dbt);
		$("#temperatureval2").val(response.value.bil);
		$("#temperatureval3").val(response.value.din);

		
		
		
		
		
		thermometer("thermo1", 100, response.value.cuv,false);
		thermometer("thermo2", 100, response.value.bil,false);
		thermometer("thermo3", 100, response.value.din,false);
		
	});
    }, 3000);

    // or with parameters if you want to update it using JavaScript.
    // you can update it live, and choose whether to show the animation
    // (which you might not if the updates are relatively small)
//    thermometer("thermo2", 1000000, 500000);

});







//setInterval("getRequestTemp()", 3000);
//function getRequestTemp()
//{
function SetRequestMotorCmd(url)
{
	
	$.get(url, function(response){
	});
}	
	
//}


/*$('#pmp1').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/2");
		
	});
$('#pmp2').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/3");
		
	});
function SetRequestMotorCmd(url)
{
	
	$.get(url, function(response){
	});
}*/
	
	