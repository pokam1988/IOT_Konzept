sampleApp.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.file);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);

sampleApp.directive("ngFileSelect", function(fileReader, $timeout) {
    return {
        scope: {
            ngModel: '='
        },
        link: function($scope, el) {
            function getFile(file) {
                fileReader.readAsDataUrl(file, $scope)
                    .then(function(result) {
                        $timeout(function() {
                            $scope.ngModel = result;
                        });
                    });
            }

            el.bind("change", function(e) {
                var file = (e.srcElement || e.target).files[0];
                getFile(file);
            });
        }
    };
});

sampleApp.directive('headerAccueil', function() {
    return {
        restrict: 'E',
        templateUrl: "modules/accueil/pages/header.html"
    };
});

sampleApp.directive('headerSidebarAdmin', function() {
    return {
        restrict: 'E',
        templateUrl: "modules/admin/pages/header.html"
    };
});

sampleApp.directive('headerSidebarAdminService', function() {
    return {
        restrict: 'E',
        templateUrl: "modules/admin_service/pages/header.html"
    };
});

sampleApp.directive('headerSidebarUser', function() {
    return {
        restrict: 'E',
        templateUrl: "modules/user/pages/header.html"
    };
});