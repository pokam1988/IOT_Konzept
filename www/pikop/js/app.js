// Time to use some industrial.js!
// This is where we'll initialize our components, 
// and change values with a small value simulator.

// Simulate data every 5 seconds
$(document).ready(function() {
    setTimeout(function() {
        $(".industrial").industrial({});
    },250);

    words = ["good", "evil", "money", "INT", "JS", "lisp", "C++", "C", "java", "nomer", "0xDE", "YAY!", "anims", "death", "BTC"];
	var i = 0;
	//alert("merda");
    setInterval(function() {

	   // if(i%2){
		  // alert(i);   
	   //}   
		// i++;
		
    }, 4000);
 //alert("merda aprs");
    // Also init our introjs!
    $("#start_intro").click(function() {
        introJs().start();
    });
});