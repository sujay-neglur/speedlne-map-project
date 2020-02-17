function init() {
  /**
   * Creating Maps object
   */
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat:53.7267, lng: -127.6476 }
  });

  /**
   * Defining the locations.
   * In production these locations would be retrieved from a database.
   * The user will add the locations to be displayed on the map.
   * The Geocoding API will return the latitude and longitude of a city.
   * Depending on whether Environment Canada API is used, the cityCode will be present.
   */
  const locations = [
    {id:Math.random(), lat: 58.4374, lng: -129.9994, name: "Dease", cityCode: "bc-14" },
    {id:Math.random(), lat: 58.805, lng: -122.6972, name: "Fort Nelson", cityCode: "bc-83" },
    {id:Math.random(), lat: 54.5182, lng: -128.6032, name: "Terrace", cityCode: "bc-80" },
    {id:Math.random(), lat: 53.9171, lng: -122.7497, name: "Prince George", cityCode: "bc-79" },
    {id:Math.random(), lat: 50.1163, lng: -122.9574, name: "Whistler", cityCode: "bc-86" },
    {id:Math.random(), lat: 50.9981, lng: -118.1957, name: "Revelstoke", cityCode: "bc-65" },
    {id:Math.random(), lat: 49.0955, lng: -116.5135, name: "Creston", cityCode: "bc-26" }
  ];

  locations.forEach(location => {
    /**
     * Creating a Marker for every location on the map
     */
    const marker = new google.maps.Marker({
      position: {lat:location.lat, lng:location.lng},
      map
    });
    /**
     * Create the infoWindow Object.
     * The content for the infowindow depends on the API service used to get the weather information.
     */
    const infoWindow = new google.maps.InfoWindow({
      content: getContentString(location.cityCode, "large")
    });
    
    /**
     * Register the infoWindow to be activated on the Marker click.
     */
    marker.addListener("click", () => infoWindow.open(map, marker));
  });

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