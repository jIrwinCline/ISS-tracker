
import {userCity, currentTracker} from "./main.js";

export class ISSTracker{
    constructor(city){
      this.city = city;
      this.lat = 0;
      this.lng = 0;
    }
    getMapData(inputCity){
      let cityQuery = new Promise(function(resolve,reject){

        let request = new XMLHttpRequest();
        let url = `http://open.mapquestapi.com/geocoding/v1/address?key=zVuvVGcUo18DmXgiYE6qPt93ri2h67l6&location=${inputCity}`;

        request.onload = function(){
          if(this.status === 200){
            resolve(request.response);
            console.log("API Request Successful!");
          }else {
            reject(Error(request.statusText));
          }
        }

        request.open("GET", url, true);
        request.send();


      });



      // Promise has to come after the creation of the promise template
      cityQuery.then(cityQueryPlaceholder => {
        console.log("Promise fulfilled!!");
        let geoData = JSON.parse(cityQueryPlaceholder);
        console.log(geoData);
        this.city = geoData.results[0].locations[0].adminArea5;
        this.lat = geoData.results[0].locations[0].latLng.lat;
        this.lng = geoData.results[0].locations[0].latLng.lng;
        console.log(this);
      })

    }

      geoDataMaker(apiResponse){

    }
}
