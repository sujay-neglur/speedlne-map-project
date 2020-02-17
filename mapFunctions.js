function init() {
  const map = new ScreenMap(53.7267,-127.6476);
  const locations = [
    {id:Math.random(), lat: 58.4374, lng: -129.9994, name: "Dease", cityCode: "bc-14" },
    {id:Math.random(), lat: 58.805, lng: -122.6972, name: "Fort Nelson", cityCode: "bc-83" },
    {id:Math.random(), lat: 54.5182, lng: -128.6032, name: "Terrace", cityCode: "bc-80" },
    {id:Math.random(), lat: 53.9171, lng: -122.7497, name: "Prince George", cityCode: "bc-79" },
    {id:Math.random(), lat: 50.1163, lng: -122.9574, name: "Whistler", cityCode: "bc-86" },
    {id:Math.random(), lat: 50.9981, lng: -118.1957, name: "Revelstoke", cityCode: "bc-65" },
    {id:Math.random(), lat: 49.0955, lng: -116.5135, name: "Creston", cityCode: "bc-26" }
  ];
  map.addLocations(locations);
  addOptionsToSelect(map.getLocations(), map);
  locations.forEach(location => {
    geocdeMock(location.lat, location.lng)
    .then(function(result){
      const marker = new google.maps.Marker({
        position: result.data,
        map: map.getMapInstance()
      });
      map.addMarker(location.id, marker);
      infoWindow = new google.maps.InfoWindow({
        content: getContentString(location.cityCode, "large")
      });
      /**
       * Add location to info window for future use
       */
      infoWindow.location = location.name;
      console.log(infoWindow.location)
      google.maps.event.addListener(infoWindow, "closeclick", function(){

        // document.getElementById(infoWindow.location).selected = false;
        console.log(infoWindow.location)
      })
      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });
      map.addInfoWindow(location.id,infoWindow);
    })
  })

}

function addOptionsToSelect(locations, map){
  const select = document.getElementById("citySelect");
  locations.forEach(location => {
    const option = document.createElement("option");
    option.id= location.id;
    option.innerHTML = location.name;
    option.onclick = () => handleOptionOnClick(map,option.id);
    select.appendChild(option)
  })
}

function geocdeMock(lat, lng) {
  return Promise.resolve({
    data: {
      lat,
      lng
    }
  });
}

function handleOptionOnClick(map,id){
  const selectedCities = map.getSelectedCities();
  if(!selectedCities.includes(id)){
    map.addCity(id);
    map.getMarker(id).infoWindow.open(map.getMapInstance(), map.getMarker(id));
  }
  else {
    map.removeCity(id);
    map.getMarker(id).infoWindow.close();
    document.getElementById(id).selected = false;
  }
}

function getContentString(cityCode, size) {
  let width = "200px",
    height = "150px";
  if (size === "small") {
    height = "75px";
    width = "125px";
  }

  if (size === "medium") {
    height = "125px";
    width = "175px";
  }

  if (size === "large") {
    height = "175px";
    width = "225px";
  }
  return `<iframe id=${cityCode} title="Environment Canada Weather" 
  width=${width} height=${height} src="https://weather.gc.ca/wxlink/wxlink.html?cityCode=${cityCode}&amp;lang=e"
   allowtransparency="true" frameborder="0"></iframe>`;
}