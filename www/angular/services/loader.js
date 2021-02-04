/**
 * Created by Amber Link on 4/26/2017.
 */
sampleApp.factory('Loader',[function(){
    var obj = {};
    
    obj.show = function(){
        $(".loader").html('<div class="progress"><div class="indeterminate"></div></div> ');
    };
    obj.destroy = function(){
        $(".loader").html('');
    };
    return obj;
}]);