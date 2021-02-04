
"use strict";

sampleApp.factory("Utils", ['$http', 'toaster',
    function ($http, toaster) {

        var basePath = "http://localhost/pharmacall_services/DAL/";

        var obj = {};
        obj.toast = function (type,data) {
            toaster.pop(type, data);
        };
        obj.post = function (q, object) {
            return $http.post(basePath + q, object).success(function (data,status) {
                return {data:data,status:status};
            });
        };
        obj.get = function(url){
            return $http.get(basePath + url).success(function(data){
                return {data:data};
            })
        };
        obj.upload = function (q, object,transformRequest,header) {
            return $http({
                method: 'POST',
                url: basePath + q,
                data: object,
                transformRequest: transformRequest,
                headers: header
            }).then(function (results) {
                    return results.data;
                });
        };

        return obj;
}]);