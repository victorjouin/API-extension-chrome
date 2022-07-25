// test for html injections

var script = document.createElement('script');
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
//div.attachShadow({ mode: 'open' }).innerHTML +=

var weburl = "http://localhost:3000"

getapi()
htmlme(weburl);
showdata();
//showdatalink();

// extension display

function htmlme(weburl) {
  var div = document.createElement("div");
  document.body.appendChild(div);
  div.name="extension";
  div.innerHTML +=
    '<div id="base" name="divy" style="flex-direction: column; overflow-y: scroll; top: 9%;backface-visibility: inherit;right: 70%;position: fixed;z-index : 7;display: flex;height: 5%; top:90%; background: #E5E8E8;width: 30%;box-shadow: -2px -2px 10px;">' +
    '<div style="width: 30%;position: fixed">'+
      '<div align="left" style="background: #B4B7BB; display: inline-block; width:10%;vertical-align: top;">'+
        '<button class="mybutton_secondary" id="change" style="height:20px; "> <> </button>'+ 
      '</div>' +
    '<div align="center" id="hide" style="width:90%; background:#B4B7BB;display: inline-block; "><h1 style="font-size: 17px;">Opportunities</h1></div>' +
    '</div>'+ 
    '<br>' +  
    '<button class="mybutton" id="refresh" style="width: 90px;margin:10px;margin-left:20px;display: inline-block;">rafraîchir 🔃</button>'+
    '<div align="center" id="contenu" style="list-style: none;align="center";width:80%">' + '</div>' +
    '<div id="div_form" style="">' +
    '<input id="oppo" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "titre">' +
    '<input id="name" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "nom">' +
    '<input id="firstname" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "prénom">' +
    '<input id="tel" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "tel">' +
    '<input id="email" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "email">' +
    '<input id="adresse" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "adresse">' +
    '<button  id="submit" style="width: 60%; padding: 10px; margin: 10px;display: block">Nouveau Dossier</button> ' +
    '</div>' +  
    '</div>';
}

// url      

var currentPage = location.href;
var titlePage = document.title;

function reload_data(){
  document.getElementById("contenu").innerHTML = "";
  showdata();
}
function getapi() {
  const affichage = document.getElementsByName("test");
const promise01 = fetch(weburl+"/projectsA7465D84desrefee7e9e86");
result = false;
promise01
  .then((response) => {
    const usersData = response.json();
    usersData.then((response) => {
      loadparam(response);
    });
  })

  // récupération donnée API links on load

const affichage1 = document.getElementsByName("test");
const promise02 = fetch(weburl+"/link4d8e64AA856HGE496568efd89d86");
result = false;
promise02
  .then((response) => {
    const usersLink = response.json();
    usersLink.then((response) => {
      loadparamlink(response);
    });
  })
  
}
function releoding() {
  console.log("reloading")
  setTimeout(function() {
    console.log("started")
    refresh();}, 200);
  
    setTimeout(function() {
      refresh();
    console.log("finished")}, 4000);
 
}


// eventlistener to refresh the data by clicking the fresh button (avoid inline event)

document.getElementById("refresh").addEventListener("click", refresh);
function refresh() {
  getapi();
  reload_data();
}

// function to change the display's side of the extension 

document.getElementById("change").addEventListener("click",change_side);
function change_side(){
  if (document.getElementById("base").style.right == "70%") {
       document.getElementById("base").style.left = "70%";
       document.getElementById("base").style.right = "0%";
       return
  }
  if (document.getElementById("base").style.left == "70%") {
    document.getElementById("base").style.right = "70%";
       document.getElementById("base").style.left = "0%";
    return
}
}

// function that submit info to create new profil

document.getElementById("submit").addEventListener("click",newprofil);
function newprofil(){
  console.log("new profil")
  var oppo = document.getElementById("oppo").value
  var name = document.getElementById("name").value
  var firstname = document.getElementById("firstname").value
  var tel = document.getElementById("tel").value
  var email = document.getElementById("email").value
  var adresse = document.getElementById("adresse").value
  var params = 'name='+name+'&firstname='+firstname+'&tel='+tel+'&email='+email+'&adresse='+adresse+'&oppo='+oppo+''
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var theUrl = weburl+"/projectsA7465D84desrefee7e9e86";
  xmlhttp.open("GET", theUrl+"?"+params, true);
  xmlhttp.send();
  releoding()

}

// update a dossier

document.addEventListener('click', function(e) 
{

  // update les info du profil

  e = e || window.event;
  var target = e.target || e.srcElement,
      text = target.id  
     
      // button plus d'info
      
      
      if (text.includes("mbtnY")) { 
        var num = text.split('Y')
        var j = num[1].toString()
        var check = document.getElementById("opt-in"+j).checked
        if (check == false) {
          document.getElementById("opt-in"+j).checked = true
          document.getElementById("mbtnY"+j).style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.75)"
        }
        else {
          document.getElementById("opt-in"+j).checked = false
          document.getElementById("mbtnY"+j).style.boxShadow = "0px 0px 0px 0px rgba(0,0,0,0.75)"
        }
        console.log("un pas en avant",check)}
     
      // button lien
       
      if (text.includes("mbtnU")) {
        var num = text.split('U')
        var j = num[1].toString()
        var link = document.getElementById("lien"+j).style.display
        if (link == "none") {
          document.getElementById("lien"+j).style.display = "block"
          document.getElementById("mbtnU"+j).style.boxShadow = "10px 10px 5px 0px rgba(0,0,0,0.75)"

        }
        else {
          document.getElementById("lien"+j).style.display = "none"
          document.getElementById("mbtnU"+j).style.boxShadow = "0px 0px 0px 0px rgba(0,0,0,0.75)"
        }
      }
      
      // button link modification hide/show

      if (text.includes("post")) {
        
        var num = text.split('post')
        var i = num[1].toString()
        var j = num[2].toString()
        var link = document.getElementById("linkf"+i+j).style.display
        if (link == "none") {
          document.getElementById("linkf"+i+j).style.display = "block"
          document.getElementById("post"+i+"post"+j).style.boxShadow = "10px 10px 5px 5px rgba(0,0,0,0.75)"
        }
        else {
          document.getElementById("linkf"+i+j).style.display = "none"
          document.getElementById("post"+i+"post"+j).style.boxShadow = "0px 0px 0px 0px rgba(0,0,0,0.75)"
        }
      }
      
      if (text.includes("mbtnT")) {
        console.log("profil sending")
        var num = text.split('T')
        var j = num[1].toString()
        var title = document.getElementById("title"+j).value
        var type = document.getElementById("type"+j).value
        var status = document.getElementById("state1"+j).value
        var price = document.getElementById("price"+j).value
        var lastname = document.getElementById("lastname1"+j).value
        var tel = document.getElementById("tel1"+j).value
        var email = document.getElementById("email1"+j).value
        var id = document.getElementById("id"+j).value
        var url = document.getElementById("url"+j).value
        var url_title = document.getElementById("url_title"+j).value
        var params = 'title='+title+'&type='+type+'&state1='+status+'&price='+price+'&lastname1='+lastname+'&email1='+email+'&tel1='+tel+'&id='+id+'&url='+url+'&url_title='+url_title+''
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  var theUrl = weburl+"/link4d8e64AA856HGE496568efd89d86";
  xmlhttp.open("GET", theUrl+"?"+params, true);
  xmlhttp.send();
  releoding()
      }

// add a link to a profil


      if (text.includes("mbtnlink")) {
        console.log("link sending ")
        var num = text.split('k')
        var j = num[1].toString()
        var title1 = document.getElementById("title"+j).value
        var type = document.getElementById("type"+j).value
        var status = document.getElementById("state1"+j).value
        var price = document.getElementById("price"+j).value
        var lastname = document.getElementById("lastname1"+j).value
        var tel = document.getElementById("tel1"+j).value
        var email = document.getElementById("email1"+j).value
        var id = document.getElementById("id"+j).value
        var url = document.getElementById("url"+j).value.replace('#','8')
        var url_title = document.getElementById("url_title"+j).value
        var url_desc = document.getElementById("url_desc"+j).value

        var params = 'title='+title1+'&type='+type+'&state1='+status+'&price='+price+'&lastname1='+lastname+'&email1='+email+'&tel1='+tel+'&id='+id+'&url_title='+url_title+'&url_desc='+url_desc+'&url='+""+url+""+''
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        console.log(params)
  var theUrl = weburl+"/link4d8e64AA856HGE496568efd89d86";
  xmlhttp.open("GET", theUrl+"?"+params, true);
  xmlhttp.send();
  releoding()
      }

      // delete a link

      if (text.includes("dlts")){

        var num = text.split('dlts')
        var i = num[1].toString()
        var j = num[2].toString()
        var id_user = document.getElementById("id_user"+j+"op"+i).value
        var url_user = document.getElementById("url_user"+j+"op"+i).value
        var url_desc = document.getElementById("url_desc"+j+"op"+i).value
        var params = 'id_user='+id_user+'&url_user='+url_user+'&url_desc='+url_desc+'&delete=1'
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = weburl+"/link4d8e64AA856HGE496568efd89d86";
        xmlhttp.open("GET", theUrl+"?"+params, true);
        xmlhttp.send();
        releoding()
      }

      // update a link

       if (text.includes("pos")){
        var num = text.split('pos')
        var j = num[1].toString()
        var i = num[2].toString()
        var url_titre = document.getElementById("url_titre"+j+"op"+i).value
        var id_user1 = document.getElementById("id_user"+j+"op"+i).value
        var url_user1 = document.getElementById("url_user1"+j+"op"+i).value
        var url_desc1 = document.getElementById("url_desc1"+j+"op"+i).value
        var params = 'url_titre='+url_titre+'&id_user='+id_user1+'&url_user='+url_user1+'&url_desc='+url_desc1+'&delete=0'
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = weburl+"/link4d8e64AA856HGE496568efd89d86";
        xmlhttp.open("GET", theUrl+"?"+params, true);
        xmlhttp.send();
        releoding()
      
      }
}, false);



// funciton do hide and show the extension

document.getElementById("hide").addEventListener("click",hide);
function hide(){ 
  if (document.getElementById("base").style.height == "90%") {
    chrome.storage.local.set({hider:false},function() {
      chrome.storage.local.get(['hider'], function(result){
      })
    })
       document.getElementById("base").style.height = "5%";
       document.getElementById("base").style.top = "95%";
       return
  }
  if (document.getElementById("base").style.height == "5%") {
    chrome.storage.local.set({hider:true},function() {
      chrome.storage.local.get(['hider'], function(result){
      })
    })
    document.getElementById("base").style.height = "90%";
    document.getElementById("base").style.top = "9%";
    return
}
}


// récupération donnée API project on load
/*var intervalId = window.setInterval(function(){
  var value = chrome.storage.local.get(['hider'], function(result){
    
    if (result.hider != false && result.hider != true) {
      chrome.storage.local.set({hider:false})
    }
    if (result.hider == false) {
      document.getElementById("base").style.height = "5%";
      document.getElementById("base").style.top = "95%";
      return
    }
    if (result.hider == true) {
      document.getElementById("base").style.height = "90%";
    document.getElementById("base").style.top = "9%";
    return
    }
  
  })

   
      

}, 2000);*/


// affichage des données sur l'extension

async function loadparam(response) {
  if (response != result){
  }
  const name = response[0].userLastName;
  var count = response.length;
  storedata(response, count);
}
async function loadparamlink(response) {
  const name = response[0].adresse;
  var count = response.length;
  storedatalink(response, count);
}


// stockage des donnée sur un BD chrome
function storedata(response, count) {
  
  // clean data before adding new data
  
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
    // do something more
});
chrome.storage.local.clear();
  for (var i = 0; i != count; i++) {
    chrome.storage.local.set({ opportunity: response }, function () {
    });
  }
}
function storedatalink(response, count) {
  for (var i = 0; i != count; i++) {
    chrome.storage.local.set({ links: response}, function () {
    });
  }
}


// affichage des données via la DB chrome    


function showdata() {
  var count = 0;
chrome.storage.local.get(['opportunity'], function (result) {
    count = result.opportunity.length;
    data_display(count);
  });
}
function showdatalink() {
  var count = 0;
   chrome.storage.local.get(['links'], function (result) {
    count = result.links.length;
  });
}
$("mbtn").on("click", () => {

});

function data_display(count) {
  for (let j = 0; j != count; j++) {
      chrome.storage.local.get(['opportunity', 'links'], function (result) {
        $("#contenu").append('<li style="box-shadow: 4px 1px 6px -1px rgba(0,0,0,0.23);border: solid;border-color:#D7D7D7;border-width: thick; border-radius: 10px; width:90%;hover : div[name="info"]{display: block}">' +
        '<link rel="stylesheet" href="style.css">' +
        '<h3 align="center" class="title" style="margin:15px;"><input class="cardtitle" type="text" style="width:95%;background-color: #ffffff;" name="title" id="title'+j+'" value="' + result.opportunity[j].title + '"></h3>'+
        'type :<input class="card" type="text" style="width:18%;background-color: #ffffff;" name="type" id="type'+j+'" value="' + result.opportunity[j].type + '">'+
        'status:<select class="card" style="width:18%" id="state1'+j+'" name="state1">'+
        '<option>' + result.opportunity[j].status + '</option>'+
        '<option>nouveau</option><br>'+
        '<option>assigné</option><br>'+
        '<option>Analyse du besoin</option><br>'+
        '<option>Négociation</option><br>'+
        '<option>En cours production / livraison</option><br>'+
        '<option>Fermé / Gagné</option><br>'+
        '<option>Fermé / Perdu</option><br>'+
        '</select>'+
        'prix:<input class="card" type="text" style="width:10%;background-color: #ffffff;" name="price" id="price'+j+'" value="' + result.opportunity[j].previsionalFinancement +'"><br>'+
        '<div style="margin:7px">'+
        '<button class="mybutton" style="margin-left:2%" id="mbtnY'+j+'" type="submit" >plus info ⬇️</button>'+
        '<button class="mybutton" style="margin-left:2%" id="mbtnU'+j+'" type="submit" >+ 🔗</button>'+
        '<button class="mybutton" style="margin-left:2%" id="mbtnT'+j+'" type="submit" >💾</button>'+
        '</div>'+
        '<input type="checkbox" style="display: none ;position: inherit;width:20px;height:20px;" name="my-checkbox" id="opt-in'+j+'">'+
        '<label for="opt-in'+j+'"></label>'+
        '<div name="info">' +
          '<span> date: ' + result.opportunity[j].nextActionDate + '</span><br>' +
          '<input class="card" type="text" style="background-color: #ffffff;" placeholder="nom" id="lastname1'+j+'" name="lastname1"value="' + result.opportunity[j].userLastName + '">' +
          '<input class="card" type="text" style="background-color: #ffffff;" placeholder="email" id="email1'+j+'" name="email1"value="' + result.opportunity[j].userMail + '">' +
          '<input class="card" type="text" style="background-color: #ffffff;" placeholder="telephone" id="tel1'+j+'" name="tel1" value="' + result.opportunity[j].userTel + '">' +
          '<input class="card" type="text" style="display:none"id="id'+j+'" name="id" value="' + result.opportunity[j]._id + '"><br>' +
          '<textarea class="card" type="text" style="background-color: #ffffff;" placeholder="description" id="descript'+j+'" name="descript" >'+result.opportunity[j].description +'</textarea> <br><br><br>' +
          '<div id="urls'+j+'" style="">'+
        '</div>'+ 
          '</div>'+       
        '<div style="display: none" id="lien'+j+'">'+
            '<div name="link" style="">'+
              '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" id="url'+j+'" name="url" value="' + currentPage + '"><br>' +
              '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" id="url_title'+j+'" name="url_title" placeholder = "titre lien" value= "'+ titlePage + '"><br>' +
              '<textarea style="background-color: #ffffff;width: 80%;" type="text" placeholder = "description lien" id="url_desc'+j+'" name="url_desc"></textarea><br>' +
              '<button class="mybutton" type="submit" id="mbtnlink'+j+'">💾</button>' +       
            '</div>' +     
        '</div>'+ 
        '<br>');
        var count1 = result.links.length;
      
        for(let i = 0;i != count1;i++)
        {
          if(result.opportunity[j]._id == result.links[i].opportunity_id)
          {
            $("#urls"+j).append('<div style="display: none" name="deletelink" id="dlt'+j+'pos'+i+'" class="font" class="intial" >'+
            'titre: <a target="_blank" name="'+result.links[i].adresse+'" href="'+result.links[i].adresse.replace(/8inbox/,"#inbox")+'">'+result.links[i].url_titre+'</a>'+
            '<div id="linkd'+j+'" style="display: none">'+
            '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" id="id_user'+i+'op'+j+'" name="id_user" placeholder = "titre lien" value= "'+result.opportunity[j]._id+ '" ><br>' +
            '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" id="url_user'+i+'op'+j+'" name="url_user" placeholder = "titre lien" value= "'+result.links[i].adresse+ '" ><br>' +
            '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" id="url_desc'+i+'op'+j+'" name="url_desc" placeholder = "titre lien" value= "'+result.links[i].url_desc+ '" ><br>' +
            '<input class="card" style="background-color: #ffffff;display:none;" type="text"  type="text" name="delete" placeholder = "titre lien" value= "1"><br>' +
            '<span> description: '+ result.links[i].url_desc +'  </span></div>'+
            '</div>'+       
            '<button type="submit" id="post'+i+'post'+j+'" class="mybutton3" style="margin-right:8px">⬇️</button>'+  
            '<a target="_blank" name="'+result.links[i].adresse+'" href="'+result.links[i].adresse.replace(/8inbox/,"#inbox")+'">'+result.links[i].url_titre+'</a> - '+
            '<span style="width:90px"> '+ result.links[i].url_desc +'  </span>'+
            '<button type="submit" form="dlt'+j+'pos'+i+'" id="dlts'+j+'dlts'+i+'"" class="mybutton2">X</button>'+     
            '<div id="linkf'+i+j+'"  style="display: none">'+
            '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" name="url_titre" id="url_titre'+i+'op'+j+'" placeholder = "titre lien" value= "'+result.links[i].url_titre+ '"><br>' +
            '<input class="card" style="background-color: #ffffff;display: none;" type="text" style="width: 70%;" type="text" name="id_user" placeholder = "id utilisateur lien" value= "'+result.opportunity[j]._id+ '" ><br>' +
            '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text"  name="url_user" id="url_user1'+i+'op'+j+'" placeholder = "titre lien" value= "'+result.links[i].adresse+ '"><br>' +
            '<input class="card" style="background-color: #ffffff;" type="text" style="width: 70%;" type="text" name="url_desc" id="url_desc1'+i+'op'+j+'" placeholder = "titre lien" value= "'+result.links[i].url_desc+ '"><br>' +
            '<input class="card" style="background-color: #ffffff;display:none;" type="text"  type="text" name="delete" placeholder = "titre lien" value= "0"><br>' +
            '<button type="submit" id="pos'+i+'pos'+j+'" class="mybutton3">Modifier</button>'+
            '</div>'+
          
            
            '<hr><br>');
            
          }
          
      }
      $("#contenu").append(
        '</div>' +
        '</li>' +
        '<br>'+
        '<br>');
       
    });
   
  }
  document.getElementById("hide").addEventListener("click",test);
function test(){
}

  // vérifier si l'url change


  setInterval(function () {
    if (currentPage != location.href) {
      currentPage = location.href;
      titlePage = document.title
      $('[name="url"]').val(window.location.href);
      $('[name="url_title"]').val(window.document.title);
    }
  }, 500);
}


// get the links
