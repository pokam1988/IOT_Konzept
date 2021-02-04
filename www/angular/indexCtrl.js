sampleApp.controller('indexController', function($scope, $http, $location, Loader, utilitaire) {
	/*if(localStorage.getItem('auth_user_token')!=null && localStorage.getItem('ref_connected_user')!= null) location='#/home';*/

	$scope.email="";
	$scope.password="";
	$scope.utilitaire=utilitaire;
	$scope.categoriesIcons =["lnr lnr-users color-1", "lnr lnr-laptop-phone color-2", "lnr lnr-cog color-3", "lnr lnr-cart color-4", "lnr lnr-briefcase color-5", "lnr lnr-graduation-hat color-6", "lnr lnr-car color-8"];

	$scope.connected_user=null;
	$scope.getUserConnectedInfos=function(){
		Loader.show();
		var connected_user=utilitaire.getUserConnectedInfos();
		if (connected_user!=null && connected_user.role_id==1) {
			Loader.destroy();
			location="admin/";
		}
		else if (connected_user!=null && connected_user.role_id==3) {
			Loader.destroy();
			location="adminOrg/";
		}
		else if (connected_user!=null && connected_user.role_id==4) {
			Loader.destroy();
			location="adminCom/";
		}
		else{ 
			Loader.destroy();
			location="user/";
		}

	}

	$scope.getUserConnectedInfos();

	
});
