'use strict';
(function() {
  var img = document.querySelector('#show-cover');
  var p = document.querySelector('#episode-count');
  var h2 = document.querySelector('#show-title');
  var header = document.querySelector('header');
  var headerNav = document.querySelector('header > nav');
  var footerNav = document.querySelector('footer > nav');
  var menuContainer;
  var firstLoad = true;
  var id = 0;

  document.addEventListener('DOMContentLoaded', function() {
    checkSize();
    window.addEventListener('resize', checkSize);
  });

  function checkSize() {
    var headerDisplay = window.getComputedStyle(header, 'display').getPropertyValue('display');
    if (headerDisplay === 'none') { 
      appendMenu(footerNav);
    } else if (headerDisplay === 'block') { 
      appendMenu(headerNav); 
    }
  }

  function appendMenu(el) {
    var menu = document.querySelectorAll('.menu-container');
    var nav = document.querySelectorAll('nav');
    var menuArr = Array.prototype.slice.call(menu);
    var navArr = Array.prototype.slice.call(nav);
    if (firstLoad) {
      menuContainer = document.createElement('div');
      menuContainer.className = 'menu-container';
      menuContainer.innerHTML = '<ul><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li></ul><ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>';
      el.appendChild(menuContainer);
    } else {
      menuContainer = menuArr[menuArr.length - 1].cloneNode(true);
      var newMenu = menuContainer;
      if (menuContainer) {
        for (var i = 0; i < navArr.length; i++) {
          navArr[i].innerHTML = '';
        }
      }
      el.appendChild(newMenu);
    }
    firstLoad = false;
    addClicks();
  }

  var addClicks = function() {
    var showSelector = document.querySelectorAll('.show-selector');
    var navButtons = Array.prototype.slice.call(showSelector);

    for (var i = 0; i < navButtons.length; i++) {
      navButtons[i].addEventListener('click', function() {
        id = navButtons.indexOf(this);
        if (id >= 4) { id -= 4; }
        this.id = 'active';
        return id; 
      });
    }
  };

  function fetchJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (typeof callback === 'function') 
            callback(data);
        }
      }
    };
    xhr.open('GET', path);
    xhr.send();
  }

  fetchJSON('/shows.json', function(data) {
    img.src = data[id].product_image_url;
    p.innerHTML = data[id].episodes + ' EPISODES';
    h2.innerHTML = data[id].title.toUpperCase();

  });
})();
