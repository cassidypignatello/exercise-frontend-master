// header('content-type: application/json; charset=utf-8');
// header("access-control-allow-origin: *");

(function() {
  function fetchJSON(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
          var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
        }
      }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
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
