class ScreenMap {

    constructor(lat, lng) {
      this.lat = lat;
      this.lng = lng;
      this.markers = {};
      this.locations = [];
      this.selectedCities = [];
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat, lng }
      });
    }
  
  
    /**
     * Map instance
     */
    getMapInstance(){
      return this.map;
    }
  
    /**
     * Getter and setter for individual city. Adds to selected cities
     * @param {string} city 
     */
    addCity(city){
      this.selectedCities.push(city);
    }
  
    removeCity(city){
      const index = this.selectedCities.indexOf(city);
      this.selectedCities.splice(index,1);
    }
  
  
    /**
     * Return all selected cities marked on the map
     */
    getSelectedCities(){
      return this.selectedCities;
    }
  
    /**
     * Add marker to the map instance
     * Getter and setter for marker
     * @param {string} id 
     * @param {object} marker 
     */
    addMarker(id, marker){
      this.markers[id] = marker;
    }
  
    getMarker(id){
      return this.markers[id];
    }
  
    /**
     * Add infoWindow to a Marker
     * @param {string} id 
     * @param {object} infoWindow 
     */
    addInfoWindow(id, infoWindow){
      this.markers[id].infoWindow = infoWindow;
    }
  
    getInfoWindow(id){
      return this.markers[id].infoWindow;
    }
  
    /**
     * Add individual location to the map
     * @param {string} location 
     */
  
    addLocation(location){
      this.locations.push(location);
    }
  
    getLocationById(id){
        return this.locations.filter(location => location === id )[0];
    }
    /**
     * Add array of id to the map
     * @param {array} locations 
     */
    addLocations(locations){
      this.locations = locations;
    }
  
    /**
     * Get array of locations from the map
     */
    getLocations(){
      return this.locations;
    }
    
  }