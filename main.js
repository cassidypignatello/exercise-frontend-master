(function() {
  var img = document.querySelector('#show-cover');
  var p = document.querySelector('#episode-count');
  var h2 = document.querySelector('#show-title');
  var header = document.querySelector('header');
  var headerNav = document.querySelector('header > nav');
  var footerNav = document.querySelector('footer > nav');
  var id = 0;

  document.addEventListener('DOMContentLoaded', function() {
    checkSize();
    window.addEventListener('resize', checkSize);
  });

  function checkSize() {
    var headerDisplay = window.getComputedStyle(header, 'display').getPropertyValue('display');
    if (headerDisplay === 'none' && !footerNav.firstChild) {
      appendMenu(footerNav);
    } else if (headerDisplay === 'block' && !headerNav.firstChild) {
      appendMenu(headerNav);
    }
  }

  function appendMenu(el, data) {
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
          if (callback) 
            callback(data);
        }
      }
    };
    xhr.open('GET', path);
    xhr.send();
  }

  fetchJSON('/shows.json', function(data) {
    var navButtons = document.querySelectorAll('.show-selector');
    var arr = Array.prototype.slice.call(navButtons);
    img.src = data[id].product_image_url;
    p.innerHTML = data[id].episodes + " EPISODES";
    h2.innerHTML = data[id].title.toUpperCase();

    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', function() {
        id = arr.indexOf(this);
        if (id >= 4) {
          id -= 4;
        }
        this.style.backgroundColor = 'black';   
        img.src = data[id].product_image_url;
        p.innerHTML = data[id].episodes + " EPISODES";
        h2.innerHTML = data[id].title.toUpperCase();
      });
    }
  });
})();
