sampleApp.config(['$routeProvider','$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    /*accueil routes*/
    .when('/',
		{ templateUrl: 'modules/accueil/home/views/home.html',
			controller: 'welcomeController' 
		})
    .when('/home',
		{ templateUrl: 'modules/accueil/home/views/home.html',
			controller: 'welcomeController' 
		})
	.when('/login',
		{ templateUrl: 'modules/accueil/home/views/login.html',
			controller: 'welcomeController'
		})
    .when('/affichage-controle',
		{ templateUrl: 'modules/actionneur/controle/views/affichage.html',
			controller: 'actionneurController' 
		})
    .when('/controle',
		{ templateUrl: 'modules/actionneur/controle/views/controle.html',
			controller: 'actionneurController' 
		})
    .when('/diagramme',
		{ templateUrl: 'modules/capteurs/diagramme/views/diagramme.html',
			controller: 'diagrammeController' 
		})

		.when('/display', {
			templateUrl:'modules/capteurs/diagramme/views/displayValue.html',
			controller: 'diagrammeController'
		})

		.when('/set-level', {
			templateUrl:'modules/capteurs/diagramme/views/setLiquidLevel.html',
			controller: 'diagrammeController'
		})

		.when('/menu', {
			templateUrl:'modules/accueil/home/views/menuDemo.html',
			controller: 'welcomeController'
        })
        .when('/progress', {
            templateUrl: 'modules/capteurs/diagramme/views/progressView.html',
            controller: 'diagrammeController'
        })

    .when('/not-found', {
	          templateUrl: 'modules/accueil/home/views/404.html' 
        })
    
    .otherwise({ redirectTo: '/not-found' });
	  /*$locationProvider.html5Mode(true);*/
}]);

