    var map = L.map('mapid').fitWorld();
      map.locate({setView: true, maxZoom: 16});

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://team-solutions.org/">Team @ Solutions</a> 2019'
      }).addTo(map);


      function onLocationFound(e) {

        L.marker(e.latlng).addTo(map)
                .bindPopup("Votre position actuelle").openPopup();

        depart.latitude = e.latlng.lat;
        depart.longitude = e.latlng.lng;

          console.log(depart);
      }

      map.on('locationfound', onLocationFound);

      function onLocationError(e) {
        alert(e.message);
      }