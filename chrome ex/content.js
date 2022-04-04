var script = document.createElement('script');
script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
//div.attachShadow({ mode: 'open' }).innerHTML +=

htmlme();
showdata();
//showdatalink();




// extension display

function htmlme() {
  var div = document.createElement("div");
  document.body.appendChild(div);
  div.name="extension";
  div.innerHTML +=
    '<div id="base" name="divy" style="flex-direction: column; overflow-y: scroll; top: 9%;backface-visibility: inherit;left: 70%;position: fixed;z-index : 7;display: flex;height: 90%; background: #E5E8E8;width: 30%;box-shadow: -2px -2px 10px;">' +
    '<div align="center" style="background: #ABB2B9">' +
    '<h1 style="font-size: 20px;">Opportunities</h1>' +
    '</div>' +
    '<br>' +
    '<form id="formula5" method="PUT" target="_blank" action="https://testingelevator.meteorapp.com/projectsA7465D84desrefee7e9e86">' +
    '<button type="submit" id="submit1" style="width: 60%; padding: 10px; margin: 10px;">Récupérer Le Dossier</button>' +
    '</form>' +
    '<div align="center" id="contenu" style="list-style: none;align="center";width:80%">' + '</div>' +
    '<form id="formula" method="GET" target="_blank" action="https://testingelevator.meteorapp.com/projectsA7465D84desrefee7e9e86?name="name&firstname="firstname"&tel="test"&email="email"&adresse="adresse"">' +
    '<div id="div_form" style="">' +
    '<input name="name" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "nom">' +
    '<input name="firstname" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "prénom">' +
    '<input name="tel" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "tel">' +
    '<input name="email" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "email">' +
    '<input name="adresse" type="text" style="width: 60%; border: 0px; padding: 10px; margin: 10px;" placeholder = "adresse">' +
    '<button type="submit" id="submit" style="width: 60%; padding: 10px; margin: 10px;display: block">Nouveau Dossier</button> ' +
    '</div>' +
    '</form>' +
    '</div>';
}


// url      

var currentPage = location.href;





// récupération donnée API project

const affichage = document.getElementsByName("test");
const promise01 = fetch("https://testingelevator.meteorapp.com/projectsA7465D84desrefee7e9e86");
result = false;
promise01
  .then((response) => {
    console.log(response);

    const usersData = response.json();
    console.log(usersData);
    usersData.then((response) => {
      loadparam(response);
    });
  })




 // récupération donnée API links

const affichage1 = document.getElementsByName("test");
const promise02 = fetch("https://testingelevator.meteorapp.com/link4d8e64AA856HGE496568efd89d86");
result = false;
promise02
  .then((response) => {
    console.log(response);

    const usersLink = response.json();
    console.log(usersLink);
    usersLink.then((response) => {
      loadparamlink(response);
    });
  })



// affichage des données sur l'extension

async function loadparam(response) {
  const name = response[1].userLastName;
  var count = response.length;
  storedata(response, count);
}
async function loadparamlink(response) {
  const name = response[1].adresse;
  var count = response.length;
  storedatalink(response, count);
}


// stockage des donnée sur un BD chrome
function storedata(response, count) {
  for (var i = 0; i != count; i++) {
    chrome.storage.sync.set({ opportunity: response }, function () {
    });
  }
}

function storedatalink(response, count) {
  for (var i = 0; i != count; i++) {
    chrome.storage.sync.set({ links: response}, function () {
      console.log(result.links[i].adresse);
    });
  }
}



// affichage des données via la DB chrome    


function showdata() {
  var count = 0;
  chrome.storage.sync.get(['opportunity'], function (result) {
    count = result.opportunity.length;
    data_display(count);
  });
}

function showdatalink() {
  var count = 0;
  chrome.storage.sync.get(['links'], function (result) {
    count = result.links.length;
  });
}

function data_display(count) {
  for (let j = 0; j != count; j++) {
      chrome.storage.sync.get(['opportunity', 'links'], function (result) {
        $("#contenu").append('<li style="border: solid;border-color:#D7D7D7;border-width: thick; border-radius: 10px; width:90%;hover : div[name="info"]{display: block}">' +
        '<link rel="stylesheet" href="style.css">' +
        '<form method="GET" target="_blank" action="https://testingelevator.meteorapp.com/link4d8e64AA856HGE496568efd89d86?">' +
        '<input type="text" style="width: 20%; borde" name="lastname1"value="' + result.opportunity[j].userLastName + '"><br>' +
        '<input type="text style="width: 20%;" type="text" name="email1"value="' + result.opportunity[j].userMail + '"><br>' +
        '<input type="text style="width: 20%;" type="text" name="tel1" value="' + result.opportunity[j].userTel + '"><br>' +
        '<input type="text style="width: 20%;" type="text" name="state1"value="' + result.opportunity[j].userSituation + '"><br><br>'+
        '<span> ajouter un lien </span><br>' +
        '<input type="text" style="width: 20%;" type="text" name="url" value="' + currentPage + '"><br>' +
        '<input type="text" style="width: 20%;" type="text" placeholder = "titre lien" name="url_title"><br>' +
        '<input type="text" style="width: 20%;" type="text" placeholder = "description lien" name="url_desc"><br>' +
        '<button type="submit" style="">link</button>' +
        '</form>' +
        '<button name="myButton">information</button>' +
        '<div name="info" style="">' +
        '<span> nom: ' + result.opportunity[j].userLastName + '  </span><br>' +
        '<span> titre: ' + result.opportunity[j].title + '</span><br>' +
        '<span> date: ' + result.opportunity[j].nextActionDate + '</span><br>' +
        '<span> description: ' + result.opportunity[j].description + '</span><br>' +
        '<span> status: ' + result.opportunity[j].status + '</span><br><br>' +
        '<span id="url'+j+'"> url </span>'+
        '<br>');
        var count1 = result.links.length;
        for(let i = 0;i != count1;i++)
        {
          if(result.opportunity[j]._id == result.links[i].opportunity_id)
          {
            $("#url"+j).append('<br><a target="_blank" href="'+result.links[i].adresse+'">'+result.links[i].url_titre+'</a><br>'+
            '<span> description: ' + result.links[i].url_desc + '  </span><br><br>');
          }
      }
      $("#contenu").append(
        '</div>' +
        '</li>' +
        '<br>');
       
    });
}

  // vérifier si l'url change


  setInterval(function () {
    if (currentPage != location.href) {
      currentPage = location.href;
      $('[name="url"]').val(window.location.href);
    }
  }, 500);
}

// button affichage des info

const button = document.querySelector('button');

button.addEventListener('click', event => {
  button.innerHTML = `Nombre de clics : ${event.detail}`;
});


// get the links
