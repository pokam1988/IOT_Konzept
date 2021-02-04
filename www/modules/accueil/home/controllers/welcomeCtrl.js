sampleApp.controller('welcomeController', function($http, $scope, $routeParams, Loader, utilitaire, $location){
	$scope.utilitaire=utilitaire;
	

	$scope.logout=function(){
		Loader.show();
		
	        url = utilitaire.getBaseUrl()+'api/logout/';
	        $http.defaults.headers.post['Content-Type']="application/json"; 
	        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(utilitaire.getPrefix()+'auth_user_token');
	        $http.get(url).success(function(result){
	        	console.log(result);
	        	Loader.destroy();
				if(result.success === true){
					
					localStorage.removeItem(utilitaire.getPrefix()+'auth_user_token');
					localStorage.removeItem(utilitaire.getPrefix()+'ref_connected_user');
					localStorage.removeItem(utilitaire.getPrefix()+'infos_connected_user');
					
                    location = '#/';

                    alert("hi");
               
				}
                else utilitaire.alert(false, "Ein Fehler ist aufgettreten, Bitte versuchen sie nochmal");
	        }).error(function (data, status, header) {
	        	utilitaire.alert(true, "Bitte prüfen sie Ihre Verbindung")
                $scope.ResponseDetails = "Data: " + data +
                    "<br />status: " + status +
                    "<br />headers: " + header;
                console.log($scope.ResponseDetails);
            });
	}

    $scope.wheather = function () {
        $.ajax({
            url: 'https://api.weatherstack.com/current',
            data: {
                access_key: '0a4f1805a356e9cfbb4d1c119de4ce45',
                query: 'Douala'
            },
            dataType: 'json',
            success: function (apiResponse) {
                console.log(apiResponse);
                console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
            }
        });
    }
    $scope.wheather();

	$scope.retourAccueil=function(){
		setTimeout(function(){
			location="#/";
		}, 3000);
	}

	

});