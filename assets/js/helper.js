if (typeof(Storage) == "undefined") {
  alert('So sorry, your browser can\'t your Storage, please upgrade your browser now..');
  window.history.back();
}

function selectID(El) {
  return document.getElementById(El);
}

function createEl(ElName) {
  return document.createElement(ElName);
}

function randomNumber(max) {
  return Math.floor(Math.random() * (max++));
}

function backgroundDynamic(el) {
  el
    .style
    .backgroundImage
      = 'linear-gradient(to right top, rgba(100, 115, 201, 0.33), rgba(25, 32, 72, 0.7)), url("https://picsum.photos/2000/1080?image=' + randomNumber(25) + '")';
}

var $request = {
  get: function(object) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       object.success(this)
      }
    };

    xhttp.open("GET", object.url, true);
    xhttp.send();
  }
};

function getUser(userID) {
  var user = localStorage.getItem("user");

  if(!user) {
    $request.get({
      url: 'https://api.stackexchange.com/2.2/users/' + userID + '?site=stackoverflow',
      success: function(result) {
        localStorage.setItem("user", result.response );
      }
    });

    user = localStorage.getItem("user");
  }

  return JSON.parse(user).items[0];
}
