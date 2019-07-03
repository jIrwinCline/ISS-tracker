
import {userCity, currentTracker} from "./main.js";

export class ISSTracker{
    constructor(city){
      this.city = city;
      this.lat = 0;
      this.lng = 0;
      this.dates = [];
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
        getISSData();
      })

    }

      getISSData(){
      let issQuery = new Promise(function(resolve, reject){
      let request = new XMLHttpRequest();
      let url = `http://api.open-notify.org/iss-pass.json?lat=${this.lat}&lon=${this.lng}&alt=20&n=5&callback=`

      request.onload = function(){
        if (this.status === 200) {
          resolve(request.response);
        }else {
          reject(Error(request.statusText));
        }
      }

      request.open("GET", url, true);
      request.send();

      });

      issQuery.then(apiResult => {
        let issPassover = JSON.parse(apiResult);
        console.log(issPassover);
        for (let i = 0; i < issPassover.reponse.length; i++) {
          // this converts the raw risetimes into date objects
          let passoverDate = new Date(issPassover.response[i].risetime * 1000);
          this.dates.push(passoverDate);
        }

      });


    }


}
