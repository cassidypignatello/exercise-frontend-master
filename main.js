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
      menuContainer.classList.add('menu-container');
      menuContainer.innerHTML = '<ul><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li><li class="show-selector"></li></ul><ul><li></li><li></li><li></li><li></li></ul>';
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
        var shows = JSON.parse(localStorage.getItem('shows'));
        var lastChoice = JSON.stringify(shows[id]);
        displayShow(shows[id]);
        localStorage.setItem('lastChoice', lastChoice);
        history.pushState(shows[id], shows[id].title, '?id=' + shows[id].id);
      }
    });
  };

  window.addEventListener('popstate', function(event) {
    var hs = history.state;
    if ((hs === null) || (hs === undefined)) hs = event.state;
    if ((hs === null) || (hs === undefined)) hs = window.event.state;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    displayShow(hs);
  });
  function fetchJSON(path, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          if (typeof callback === 'function') callback(data);
        }
      }
    };
    xhr.open('GET', path);
    xhr.send();
  }

  fetchJSON('/shows.json', function(data) {
    var showData = JSON.stringify(data);
    if (location.search.length > 0) {
      id = location.search[location.search.length - 1] - 1;
    }
    localStorage.setItem('shows', showData);
    history.pushState(data[id], data[id].title, '?id=' + data[id].id);
    displayShow(data[id]);
  });

  function displayShow(data) {
    var listItems = Array.prototype.slice.call(document.querySelectorAll('li'));
    var showNumber = listItems[data.id + 3];
    var button = listItems[data.id - 1];
    listItems.forEach(function(item) {
      if (item.innerHTML !== '' || item.classList.contains('active')) {
        item.innerHTML = '';
        item.classList.remove('active');
      }
    });  
    showNumber.innerHTML = data.id;
    button.classList.add('active');
    img.src = data.product_image_url;
    p.innerHTML = data.episodes + ' EPISODES';
    h2.innerHTML = data.title.toUpperCase();
  }
})();