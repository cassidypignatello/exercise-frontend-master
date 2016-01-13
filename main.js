(function() {
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

  fetchJSON('shows.json', function(data){
    // display first show's info on load
    var img = document.querySelector('#show-cover');
    var p = document.querySelector('#episode-count');
    var h2 = document.querySelector('#show-title'); 
    img.src = data[0].product_image_url;
    p.innerHTML = data[0].episodes + " EPISODES";
    h2.innerHTML = data[0].title.toUpperCase();

    // add active class to square
    // display correct show number
    
     
    // make nav button background black on click
    var navButtons = document.querySelectorAll('.show-selector');
    for (var i = 0; i < navButtons.length; i++) {
      navButtons[i].addEventListener('click', function() {
        this.style.backgroundColor = 'black';
      });
    }

  });
})();
