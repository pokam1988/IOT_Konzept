/**
 * Created by Amber Link on 5/12/2017.
 */

sampleApp.factory('utilitaire', function($http){
    var obj = {};
    /*var back_url = 'http://localhost:8000/';*/
    var prefix ='lokales_';
    var back_url = 'https://lokales-feedback.team-solutions.net/api/';
   
    var url = null;
    var data = null;

    obj.getDate = function(lang){ 
      if(lang=="fr") return new Date();
      else return new Date() ;
    }

    obj.getPrefix = function(){ 
      return prefix;
    }
    obj.getBaseUrl = function(){ 
      return back_url;
    }
    obj.getUserConnectedInfos = function(){ 
      var connected_user=localStorage.getItem(obj.getPrefix()+'infos_connected_user');
      return connected_user==null ? connected_user : JSON.parse(connected_user);
    } 

    obj.toFixed=function(elt, decimal=3){
      return elt.toFixed(decimal);
    };

    obj.back = function(){ 
      history.back(1);
    };

    obj.setDomaine = function(){ 
      /*var domain = window.location.origin;*/
      var domain = "https://lokales-feedback.team-solutions.net";
      localStorage.setItem(obj.getPrefix()+'domain_name', domain);
    }

    obj.getDomaine = function(){ 
      obj.setDomaine();
      return localStorage.getItem(obj.getPrefix()+"domain_name")+'/';
    }
  
    
    obj.getType = function(type){
      if(type=="vendeur") return 1;
      else if (type=="admin") return 2;
      else if (type=="super admin") return 2;
    };

    obj.ShowHide = function(id){
      if($("#"+id).is(":visible")){
        $("#"+id).css({"display" : "none"});
        $('.indicateur').html('keyboard_arrow_down');
      } 
      else{
        $("#"+id).css({"display" : "block"});
        $('.indicateur').html('keyboard_arrow_up');
      } 
    };

    obj.ShowHideAll = function(classe, id){
      $("."+classe).css({"display": "none"});
      $("#"+id).css({"display": "block"});
      
    };

    obj.popup = function(id){
        if($('#alert').is(":visible")) $("#alert").modal("hide");
        $("#"+id).modal("show");
    }

    obj.alert = function(trueorfalse, message){
     /* alert(message);*/
      /*Materialize.toast(message, 4000);*/

     $("#alert").modal()
        
      if(trueorfalse==true){
        $("#alert-header").html('Message <i class="fa fa-check"></i> </button>' ); 
      }
      else {
        $("#alert-header").html('Attention  <i class="fa fa-warning"></i> </button>' ); 
      } 

      $("#alert-header").css({"font-weight" : "bold", "font-seize" : "20px"})

      $("#alert-header").css({"padding-left" : "4%"})
      $("#alert-content").html(message);
      $("#alert").modal("open");
      

      /*$('#alert').openModal();*/
        
    }

   obj.setValidation= function(ref){
      console.log(ref)
      $("#ref").val(ref);
      $("#validation").modal("show");
    }

    obj.range = function(total){
        var range = [];
        for(var i=0; i<total; i++) {
          range.push(i);
        }
        return range;
    }

    obj.getMonthfr = function(num_mois){
        if(num_mois==1 || num_mois=="1") return "Janvier";
        else if(num_mois==2 || num_mois=="2") return "Février";
        else if(num_mois==3 || num_mois=="3") return "Mars";
        else if(num_mois==4 || num_mois=="4") return "Avril";
        else if(num_mois==5 || num_mois=="5") return "Mai";
        else if(num_mois==6 || num_mois=="6") return "Juin";
        else if(num_mois==7 || num_mois=="7") return "Juillet";
        else if(num_mois==8 || num_mois=="8") return "Août";
        else if(num_mois==9 || num_mois=="9") return "Septembre";
        else if(num_mois==10 || num_mois=="10") return "Octobre";
        else if(num_mois==11 || num_mois=="11") return "Novembre";
        else if(num_mois==12 || num_mois=="12") return "Décembre";
    }

    obj.getMonthen = function(num_mois){
        if(num_mois==1 || num_mois=="1") return "January";
        else if(num_mois==2 || num_mois=="2") return "February";
        else if(num_mois==3 || num_mois=="3") return "March";
        else if(num_mois==4 || num_mois=="4") return "April";
        else if(num_mois==5 || num_mois=="5") return "May";
        else if(num_mois==6 || num_mois=="6") return "June";
        else if(num_mois==7 || num_mois=="7") return "July";
        else if(num_mois==8 || num_mois=="8") return "August";
        else if(num_mois==9 || num_mois=="9") return "September";
        else if(num_mois==10 || num_mois=="10") return "October";
        else if(num_mois==11 || num_mois=="11") return "November";
        else if(num_mois==12 || num_mois=="12") return "December";
    }

    obj.getDayName=function (num_jour){
      if(num_jour== 0) return "Dimanche";
      else if(num_jour== 1) return "Lundi";
      else if(num_jour== 2) return "Mardi";
      else if(num_jour== 3) return "Mercredi";
      else if(num_jour== 4) return "Jeudi";
      else if(num_jour== 5) return "Vendredi";
      else if(num_jour== 6) return "Samedi";
    }
    

    obj.getDay = function(num_jour, num_mois, num_annee){
        var mois_lettre=obj.getMonthen(num_mois+1);
        var maDate = new Date(mois_lettre+" "+num_jour+", "+num_annee+" 23:15:00");
        return maDate.getDay();
    };

    obj.getThisDay = function(){
        var ladate=new Date();
        return ladate.getDate()
    };

    obj.getThisMonth = function(){
        var ladate=new Date();
        return ladate.getMonth();
    };

    obj.getThisYear = function(){
        var ladate=new Date();
        return ladate.getFullYear();
    };

    obj.nombreJourMois= function (mois, annee){
        var nbreJour = 0;
  
        if (mois <= 6){
          if (mois%2 == 0) nbreJour = 31;
          else nbreJour = 30;
        }
        else{
          if (mois%2 == 1) nbreJour = 30;
          else nbreJour = 31;
        }

        if (mois == 1){
          if(annee%4==0){
            if(annee%100==0){
                if(annee%400==0) nbreJour = 29;
                else nbreJour = 28;
            }
            else nbreJour = 29;
          }
          else nbreJour = 28;
        }
  
        return nbreJour;
    }

    obj.getFullCalendar= function (num_mois, num_annee){
      var nbreJour=obj.NonbreJourMois(num_mois, num_annee);
      var mois_lettre=obj.getMonthen(num_mois+1);
      var calendarLine=[], calendarCol=[];
      var ligne=0;
      for (var i =1 ; i <= nbreJour; i++) {
        var maDate = new Date(mois_lettre+" "+i+", "+num_annee+" 23:15:00");
        var nJour = maDate.getDay();

        if(nJour%7==0){
          calendarLine[ligne]=calendarCol;
          calendarCol=[];

          console.log(calendarLine[ligne]);
          ligne++;

        }
        
        
        if(i==1 && nJour > 0){
          for (var j = nJour - 1; j >= 0; j--) {
            calendarCol[j]="";
          }
        }

        calendarCol[nJour]=i;

        if(nbreJour == i){
          calendarLine[ligne]=calendarCol;
          calendarCol=[];
          ligne++;
        }
      }
      console.log(calendarLine);
      return calendarLine;
      
    }

    obj.getPrevNextFullMonth= function (num_mois, num_annee){
      var nbreJour=obj.NonbreJourMois(num_mois, num_annee);
      
      var next_num_mois, prev_num_mois, next_num_annee, prev_num_annee;
       console.log(num_mois+", "+num_annee)
      if((num_mois + 1) == 1){
        next_num_mois=1; prev_num_mois=11; next_num_annee=num_annee; prev_num_annee=num_annee-1;
      }
      if((num_mois + 1) == 12){
        next_num_mois=0; prev_num_mois=10, next_num_annee=num_annee+1, prev_num_annee=num_annee;
      }
      else{
        next_num_mois=num_mois+1; prev_num_mois=num_mois-1, next_num_annee=num_annee, prev_num_annee=num_annee;
      }

      var result={"prev_num_mois" : prev_num_mois, "prev_num_annee" : prev_num_annee, "next_num_mois" : next_num_mois, "next_num_annee" : next_num_annee}

      return result;
      
    }

    
    obj.loadPage = function(page){
        window.location.href=page;
    }

    
    obj.loadMessage = function(){
      var msg=JSON.parse(sessionStorage.getItem('msg'));
      if(msg!==null) this.alert(msg);
    }

    obj.new_input = function(id, retour=false){ 
      if($("#"+id).val() == "autre"){ 
        var placeholder=(id=="probleme") ? "Entrez le nouveau problème" : (id=="probleme"? "Entrez le nouveau lieu" : "Entrez le nouveau "+id)
        var input ='<input type="text" class="form-control" id="'+id+'" ng-model="'+id+'" placeholder="'+placeholder+'">';
        if(!retour) $('#'+id).parent().html(input);
        else return input;
      }
    }

    obj.loadDatatable = function(id){
        angular.element(document).ready( function () {
                 dTable = $('#'+id)
                 dTable.DataTable();
                 /* $('#example').dataTable();*/
        });
    }

    obj.activer_bottom =  function(elt, id){
      $("#"+elt).parent().parent().children("li").attr("class", "");

      $("#"+elt).parent().attr("class", "active");

      $("#"+id).parent().children("div.tab-pane").removeClass("active");
      /*$("#"+id).parent().children("div.tab-pane").css({"display" : "none"});*/
     
      $("#"+id).addClass("active");
      /*$("#"+id).css({"display" : "block"});*/
    }

    obj.datepick = function(){
        $('.datepicker').datepicker({
          /*format: "dd-mm-yyyy",*/
          format: "yyyy-mm-dd", 
          todayHighlight: true    
        });
    }

    obj.selectMultiple = function(){
        $(".select2").select2();
    } 


    obj.storeTempInfo = function(info){
      localStorage.setItem(obj.getPrefix()+"temp_info", JSON.stringify(info));
    }

    obj.clearTempInfo = function(info){
      localStorage.removeItem("temp_info");
    }

    obj.getTempInfo = function(){
      return localStorage.getItem(obj.getPrefix()+"temp_info");
    }

    /*functions ajax*/

    obj.envoyerDemande=function(user_ref){
      var data = {
        recever : user_ref
      }; 
      var url = obj.getBaseUrl()+'api/user/send/apply';
      $http.defaults.headers.post['Content-Type']="application/json";
      $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
      $http.post(url, data).success(function(result){
        console.log(result.data);
        if(result.success === true){
          obj.alert(true, "Demande transmise avec succès")
        }else{
          obj.alert(false, "Erreur de transmission, veuillez recommencer");
        }
      }).error(function (data, status, header) {
        obj.alert(false, "veuillez vérifier votre connexion");
          $scope.ResponseDetails = "Data: " + data +
            "<br />status: " + status +
            "<br />headers: " + header;

      });
    };

    obj.delProduct=function(ref_produit){
      var data = {
        refProduit : ref_produit
      }; 
      var url = obj.getBaseUrl()+'api/produit/delete';
      $http.defaults.headers.post['Content-Type']="application/json";
      $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
      $http.post(url, data).success(function(result){
        console.log(result.data);
        if(result.success === true){
          obj.alert(true, "Le produit a été supprimé ave succès")
        }else{
          obj.alert(false, "Erreur est survenue, veuillez recommencer");
        }
      }).error(function (data, status, header) {
        obj.alert(false, "veuillez vérifier votre connexion");
          $scope.ResponseDetails = "Data: " + data +
            "<br />status: " + status +
            "<br />headers: " + header;

      });
    };


    obj.getUserList = function(localStorage){
        var url = obj.getBaseUrl()+'api/user/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.get(url).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.users);
                localStorage.setItem(obj.getPrefix()+"user_list", JSON.stringify(result.data.users));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });

    };
    

    obj.getListPays = function(){ 
       var url = obj.getBaseUrl()+'api/pays/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.get(url).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.Pays);
                localStorage.setItem(obj.getPrefix()+"list_pays", JSON.stringify(result.data.Pays));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });
    };

    obj.getListVilleByPays = function(ref_pays){
      var data={pays : ref_pays}
       var url = obj.getBaseUrl()+'api/ville/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.post(url, data).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.Ville);
                localStorage.setItem(obj.getPrefix()+"list_villes", JSON.stringify(result.data.Ville));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });
    };

    

    obj.getLisCommuneByVille = function(ref_ville){
      var data={ville : ref_ville}
       var url = obj.getBaseUrl()+'api/commune_Par_ville/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.post(url, data).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.Commune);
                localStorage.setItem(obj.getPrefix()+"list_communes", JSON.stringify(result.data.Commune));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });
    };

    obj.getLisQuartierByCommune = function(ref_commune){
      var data={commune : ref_commune}
       var url = obj.getBaseUrl()+'api/quartier/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.post(url, data).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.Quartier);
                localStorage.setItem(obj.getPrefix()+"list_quartiers", JSON.stringify(result.data.Quartier));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });
    };

    obj.getLisCommune= function(){
       var url = obj.getBaseUrl()+'api/commune/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.get(url).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.Commune);
                localStorage.setItem(obj.getPrefix()+"list_all_communes", JSON.stringify(result.data.Commune));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });
    };

    obj.getListAllRoles = function(){ 
        var url = obj.getBaseUrl()+'api/role/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.get(url).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.role);
                localStorage.setItem(obj.getPrefix()+"all_role", JSON.stringify(result.data.role));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });

    };

    obj.getListAllCategories = function(){ 
        var url = obj.getBaseUrl()+'api/categorie/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.get(url).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.Categorie);
                localStorage.setItem(obj.getPrefix()+"all_categorie", JSON.stringify(result.data.Categorie));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });

    };

    obj.getListSousCategoriesByCategorie = function(ref_categorie){ 
      var data={categorie : ref_categorie}
        var url = obj.getBaseUrl()+'api/sous_categorie/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.post(url, data).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.SousCategorie);
                localStorage.setItem(obj.getPrefix()+"list_sous_categorie", JSON.stringify(result.data.SousCategorie));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });

    };

    /*obj.getListAllServices = function(localStorage){ 
        var url = obj.getBaseUrl()+'api/role/list';
        $http.defaults.headers.post['Content-Type']="application/json";
        $http.defaults.headers.common.Authorization = "Bearer "+localStorage.getItem(obj.getPrefix()+'auth_user_token');
        $http.get(url).success(function(result){
            console.log(result.data);
            if(result.success === true){
                console.log(result.data.roles);
                localStorage.setItem(obj.getPrefix()+"role_list", JSON.stringify(result.data.roles));
            }
        }).error(function (data, status, header) {
            obj.alert(false, "Vérifiez votre connexion");

        });

    };*/
    
    return obj;

});