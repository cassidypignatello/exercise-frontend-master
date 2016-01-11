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
    var img = document.getElementById('show-cover');
    var p = document.getElementById('episode-count');
    var h2 = document.getElementById('show-title'); 
    img.src = data[0].product_image_url;
    p.innerHTML = data[0].episodes + " EPISODES";
    h2.innerHTML = data[0].title.toUpperCase();
  });
})();
