(function() {
  var img = document.querySelector('#show-cover');
  var p = document.querySelector('#episode-count');
  var h2 = document.querySelector('#show-title');
  var header = document.querySelector('header');
  var headerNav = document.querySelector('header > nav');
  var footerNav = document.querySelector('footer > nav');
  var navButtons = document.querySelectorAll('.show-selector');
  var arr = Array.prototype.slice.call(navButtons);

  document.addEventListener('DOMContentLoaded', function() {
    checkSize();
    window.addEventListener('resize', checkSize);
  });

  function checkSize() {
    var headerDisplay = window.getComputedStyle(header, 'display').getPropertyValue('display');
    if (headerDisplay === 'none') {
      appendMenu(footerNav);
    } else {
      appendMenu(headerNav);
    }
  }

  function appendMenu(el) {
    var menuContainer = document.createElement('div');
    menuContainer.className = 'menu-container';
    menuContainer.innerHTML = '<ul><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li></ul><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>';
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
    el.appendChild(menuContainer);
  }

  function fetchJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (callback) callback(data);
        }
      }
    };
    xhr.open('GET', path);
    xhr.send();
  }

  fetchJSON('/shows.json', function(data){
    // display first show's info on load
    img.src = data[0].product_image_url;
    p.innerHTML = data[0].episodes + " EPISODES";
    h2.innerHTML = data[0].title.toUpperCase();

    // add active class to square
    // display correct show number
    

    // make nav button background black on click

    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', function() {
        var id = arr.indexOf(this);
        this.style.backgroundColor = 'black';
        img.src = data[id].product_image_url;
        p.innerHTML = data[id].episodes + " EPISODES";
        h2.innerHTML = data[id].title.toUpperCase();
      });
    }
  });

  // function displayJSON() {
    
  // }
})();
