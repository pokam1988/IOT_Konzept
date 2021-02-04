$(document).ready(function(){
	var mainUrl = "http://192.168.240.1/arduino";
	var onOffLedUrl = "/digital/13/";
	var pwmLedUrl = "/analog/11/";
	var textUrl = "/lcd/";
	var i = 0;
	
	
	
	$('#btnGetTemp').click(function(){
		
		getRequestTemp("http://192.168.240.1/data/get");
		
	});
	
	$('#btnGetLuft').click(function(){
		
		getRequestLF("http://192.168.240.1/data/get");
		
	});
	
	$('#bton1').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/2");
		
	});
	
	$('#btoff1').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/1");
		
	});
	
	$('#bton2').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/3");
		
	});
	
	$('#btoff2').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/4");
		
	});
	
	
	$('#bton3').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/5");
		
	});
	
	$('#btoff3').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/6");
		
	});

    $('#bton4').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/7");
		
	});
	
	$('#btoff4').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/8");
		
	});	
	
	$('#btnGetWaLe').click(function(){
		getRequestWL("http://192.168.240.1/data/get");
		
	});
    

});

function getRequestTemp(url)
{
	
	$.get(url, function(response){
		console.log(response);
		$("#txtFldTemp").val(response.value.tes);
	});
}

function getRequestLF(url)
{
	
	$.get(url, function(response){
		console.log(response);
		$("#txtFldLuft").val(response.value.hum);
	});
	
}
function getRequestWL(url)
{
	
	$.get(url, function(response){
		console.log(response);
		//alert("response.value.hum");
		$("#txtFldWaLe").val(response.value.dist);
	});
	
}

function SetRequestMotorCmd(url)
{
	
	$.get(url, function(response){
	});
}


