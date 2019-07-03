import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import {ISSTracker} from "./iss-tracker.js";

export let userCity;
export const currentTracker = new ISSTracker("default", "default", "default");

$(document).ready(function(){

  $(".city-submit").click(function(){
    userCity = $(".city-input").val();
    currentTracker.getMapData(userCity);

      
  })

});
