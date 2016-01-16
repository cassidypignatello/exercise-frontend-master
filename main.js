(function() {
'use strict';
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
      menuContainer.classList.add('menu-container');
      menuContainer.innerHTML = '<ul><li class="show-selector active"></li><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li></ul><ul><li class="show-id">1</li><li class="show-id">2</li><li class="show-id">3</li><li class="show-id">4</li></ul>';
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
    var navList = document.querySelector('.menu-container');
    var showSelector = document.querySelectorAll('.show-selector');
    var navButtons = Array.prototype.slice.call(showSelector);

    navList.addEventListener('click', function(e) {
      var navButton = e.target;
      if (navButton && navButton.nodeName === 'LI') {
        id = navButtons.indexOf(navButton);
        navButtons.forEach(function(otherBtn) {
          if (otherBtn.classList.contains('active')) { otherBtn.classList.remove('active'); }  
        });
        navButton.classList.add('active');
        e.preventDefault();    
      }
      var shows = JSON.parse(sessionStorage.getItem('shows'));
      var lastChoice = JSON.stringify(shows[id]);
      sessionStorage.setItem('lastChoice', lastChoice);
      displayShow(shows[id]);
    });
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
    var prevSelection = JSON.parse(sessionStorage.getItem('lastChoice'));
    var showData = JSON.stringify(data);
    sessionStorage.setItem('shows', showData);
    if (typeof prevSelection === 'object' && prevSelection !== null) {
      displayShow(prevSelection);
    } else {
      displayShow(data[id]);
    }
  });

  function displayShow(data) {
    img.src = data.product_image_url;
    p.innerHTML = data.episodes + ' EPISODES';
    h2.innerHTML = data.title.toUpperCase();
  }
})();