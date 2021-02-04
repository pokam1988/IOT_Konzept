sampleApp.controller('diagrammeController', function($http, $scope, $routeParams, Loader, utilitaire, $location){
    $scope.utilitaire = utilitaire;
    $scope.levelMax=60
    var interval;
    if (!$("#div-progress").is(":visible")) clearInterval(interval);

    $scope.thermometer = function (id, goalAmount, progressAmount, animate) {
        "use strict";

        var $thermo = $("#" + id),
            $progress = $(".progress", $thermo),
            $goal = 100, 
            percentageAmount,
            isHorizontal = $thermo.hasClass("horizontal"),
            newCSS = {};

        goalAmount = 100;
        progressAmount = progressAmount || parseFloat($progress.text());
        percentageAmount = Math.min(progressAmount, 100); //make sure we have 1 decimal point

        
        $progress.find(".amount").text(progressAmount + " ");


        //let's set the progress indicator
        $progress.find(".amount").hide();

        newCSS[isHorizontal ? "width" : "height"] = percentageAmount + "%";

        if (animate !== false) {
            $progress.animate(newCSS, 1200, function () {
                $(this).find(".amount").fadeIn(500);
            });
        } else {
            $progress.css(newCSS);
            $progress.find(".amount").fadeIn(500);
        }
    }

    $scope.stopPompe = function () {
        clearInterval(interval);
        $("#pompe").removeClass("start").addClass("stop");
        alert("Pompe arretee");
    }

    $scope.regelung = function () {
        $("#pompe").removeClass("stop").addClass("start");
        var Myvalue = 0;
        var tankhoehe = $scope.levelMax;
        var soll = localStorage.getItem("level"); soll = soll != null ? parseFloat(soll) : 0;
    
        interval = setInterval(function () {
            $.ajax({
                url: "http://192.168.240.1/data/get/keyTasSensor_03",
                type: 'GET',
                success: function (res) {

                    Myvalue = parseFloat(res.value);
                    var schwelle=tankhoehe - Myvalue;
                    console.log("Wert von yun :" + Myvalue);
                    console.log("aktuelle Höhe  :" + schwelle);
                    if (schwelle < soll) {
                        $scope.thermometer("thermo1", 100, (schwelle), false);
                       
                    }
                    else {
                        $scope.stopPompe();
                    }
                },
                error: function (res) {

                },
                dataType: 'jsonp'
            });
            
        }, 5000);
        
    }

  

    $scope.storeLevel = function () {
        var level = $("#level").val();
        if (parseFloat(level) <= $scope.levelMax) {
            localStorage.setItem("level", level);
            utilitaire.loadPage('#/progress');
        }
        else {
            alert("Das Niveau darf nicht höher sein als" + $scope.levelMax)
        }
        
    }

    $scope.getTemperature=function(){
        
        Loader.show();

        var temperature = 0;
        
        $.ajax({
            url: "http://192.168.240.1/data/get/keyTasSensor_01",
             type: 'GET',
             success: function(res) {
                     temperature = res.value;
                     $("#tasTempSensor").val(temperature);
                     $scope.getHumidite();                   
                },
                error: function (res) {
                    console.log(res.readyState);
                    $("#tasTempSensor").val("0");
                    $scope.getHumidite();
                  },
             dataType: 'jsonp'
        });
        
    }

    

    $scope.getHumidite=function(){
        
        Loader.show();

        var humidite = 0;
        
        $.ajax({
            url: "http://192.168.240.1/data/get/keyTasSensor_02",
             type: 'GET',
             success: function(res) {
                     humidite = res.value;
                     $("#tasHumSensor").val(humidite);
                     $scope.getAltitude();               
                },
                error: function (res) {
                    console.log(res.readyState);
                    $("#tasHumSensor").val("0");
                    $scope.getAltitude(); 
                  },
             dataType: 'jsonp'
        });
        
    }

    $scope.getAltitude=function(){
        
        Loader.show();
        var altitude = 0;
        
        
        $.ajax({
            url: "http://192.168.240.1/data/get/keyTasSensor_03",
             type: 'GET',
             success: function(res) {
                     altitude = res.value;
                     $("#tasAltSensor").val(altitude);                   
                },
                error: function (res) {
                    $("#tasAltSensor").val("0");
                    console.log(res.readyState);
                },
             dataType: 'jsonp'
        });

    }

    $scope.recordparam = function () {

        Loader.show();
        $scope.getTemperature();
        $http({
            method: "GET",

            url: "http://192.168.240.1/arduino/TasStore_IOT/write" + "/" + $("#tasTempSensor").val() + "/" + $("#tasHumSensor").val() + "/" + $("#tasAltSensor").val()+ "/0"
        }).then(function mySuccess(response) {
            Loader.destroy();
           // alert("responsetemp");

        }, function myError(response) {
            Loader.destroy();
            alert(response);
        });
        
    }
    $scope.historyparam = function () {

        Loader.show();
        

        var LuftArray = [];
        var TempArray = [];
        var flowArray = [];

        var ctx = document.getElementById('myChart').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Luft',
                    data: [],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                },
                    {
                        label: 'Temperatur',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
       
        $http({
            method: "GET",

            url: "http://85.214.194.142:8086/query?q=SHOW%20SERIES%20ON%20TEMPERATURE"
        }).then(function mySuccess(response) {
            Loader.destroy();
            var resp = JSON.stringify(response);
            var data = JSON.stringify(JSON.parse(resp).data);
            var results = JSON.stringify(JSON.parse(data).results[0]);
            var series = JSON.stringify(JSON.parse(results).series[0]);
            var index;
            var temp;
            var test;


            for (index = 0; index < JSON.parse(series).values.length; index++) {
               
                temp = JSON.parse(series).values[index];
                test = ''.concat(temp);
                if (test.split(",")[0] == "IOT_tabelle") {
               
                    LuftArray.push((test.split(",")[1]).split("=")[1]);
                    TempArray.push(''.concat((test.split(",")[2]).split("=")[1]));

                 
                }
  
            }


           

            for (index = 0; index < LuftArray.length; index++) {

                myChart.data.labels.push("" + index);
                myChart.data.datasets[0].data.push(TempArray[index]);
                myChart.data.datasets[1].data.push(LuftArray[index]);

              
            }

            
            myChart.update();


        }, function myError(response) {
            Loader.destroy();
            alert(response);
        });
    



    }


});