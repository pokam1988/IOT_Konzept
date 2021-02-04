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
		$('#bton').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/1");
		
	});
	
	$('#btoff').click(function(){
		
		SetRequestMotorCmd("http://192.168.240.1/data/put/test/2");
		
	});
	
	});
function getRequestTemp(url)
{
	
	$.get(url, function(response){
		console.log(response);
		$("#txtFldTemp").val(response.value.tes);
	});
}function getRequestLF(url)
{
	
	$.get(url, function(response){
		console.log(response);
		$("#txtFldLuft").val(response.value.hum);
	});
	
function SetRequestMotorCmd(url)
{
	
	$.get(url, function(response){
	});
}
