sampleApp.controller('actionneurController', function($http, $scope, $routeParams, Loader, utilitaire, $location){
	$scope.utilitaire=utilitaire;
    var outils=localStorage.getItem('outils'); 
    console.log(outils);
    if(outils==null){ 
        $scope.outils={
            lampe : '0',
            moteur : '0',
            ventilateur : '0',
            pompe : '0'
        }
        localStorage.setItem('outils', JSON.stringify($scope.outils));
    }
    else $scope.outils=JSON.parse(outils);

    $scope.start=function(id){
        Loader.show();
        var acteur="";
        if(id=='lampe') {acteur='01'; commande="LAMPE"}
        else if(id=='moteur') {acteur='02'; ; commande="MOTOR"}
        else if(id=='ventilateur') {acteur='03'; commande="VENTILE"}
        else if(id=='pompe') {acteur='04'; commande="PUMPE"}
        $http({
            method : "GET",
            url: "http://192.168.240.1/arduino/TasActor_" + acteur + "/" + commande + "/1"
            
        }).then(function mySuccess(response) {
            Loader.destroy();
            $("#"+id).removeClass("stop").addClass("start");
            $scope.outils[""+id]='1';
            localStorage.setItem('outils', JSON.stringify($scope.outils));

        }, function myError(response) {
            Loader.destroy();
            $scope.outils[""+id]='1';
            localStorage.setItem('outils', JSON.stringify($scope.outils));
            alert("Bitte versuchen Sie noch einmal");
            $("#"+id).removeClass("stop").addClass("start");
        });

    }

    $scope.stop=function(id){
        Loader.show();
        var acteur="";
        if(id=='lampe') {acteur='01'; commande="LAMPE"}
        else if(id=='moteur') {acteur='02'; ; commande="MOTOR"}
        else if(id=='ventilateur') {acteur='03'; commande="VENTILE"}
        else if(id=='pompe') {acteur='04'; commande="PUMPE"}
        $http({
            method : "GET",
            url: "http://192.168.240.1/arduino/TasActor_"+acteur+"/"+commande+"/0"
        }).then(function mySuccess(response) {
            Loader.destroy();
            $("#"+id).removeClass("start").addClass("stop");
            $scope.outils[""+id]='0';
            localStorage.setItem('outils', JSON.stringify($scope.outils));

        }, function myError(response) {
            Loader.destroy();
            alert("Ihre Aktion ist fehlgeschlagen, Bitte versuchen Sie noch einmal");
            $("#"+id).removeClass("start").addClass("stop");
            $scope.outils[""+id]='0';
            localStorage.setItem('outils', JSON.stringify($scope.outils));
        });

    }
	

});