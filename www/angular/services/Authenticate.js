/**
 * Created by Amber Link on 5/12/2017.
 */

sampleApp.factory('Auth', function($http){
    var obj = {};
    /*var baseUrl = 'http://localhost/mica_back/';*/
    var baseUrl = 'micacm.com/user/mica_back/';
   
    var url = null;
    var data = null;

    obj.login = function(username, password){
        data = {'login':username, 'mot_passe':password};
        url = baseUrl+'user.php?fonction=login&valeurs='+JSON.stringify(data);
        var status = "Success";
        return $http.get(url).success(function(result){
            if(result.status == "Success"){
                sessionStorage.setItem('user',JSON.stringify(result.data));
                console.log(result)
            }else{
                status = result.message;
                console.log(result)
            }
            return status;
        });
    };

    obj.logout = function(){
        url = baseUrl+'user.php?fonction=destroySession&valeurs=';
        var status = "Success";
        return $http.get(url).success(function(result){
            if(result.status == "Success"){
                sessionStorage.removeItem('user');
            }else{
                status = result.status;
            }
            return status;
        });
    };


    obj.getSession = function(){
        url = baseUrl+'user.php?fonction=getUserSession';
        return $http.get(url).success(function(result){
            return result.data;
        });
    };

    return obj;

});