"use strict";

function initMapParam(locations) {
  const myLatLng = {
    lat: 42.53609283365545,
    lng: -113.81777507263591,
  };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: myLatLng,
  });

  function myFunction(item, index) {
    var title = item.ttl.replace(/,/g, "\n");
    new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map,
      title: title,
    });
  }
  locations.forEach(myFunction);
}
