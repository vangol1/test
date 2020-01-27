import { CityMap } from "./CityMap";
import { City } from "./City";
import {getDonutData} from "./helpers";

let cityMapTemp = localStorage.getItem("cityMap");
let cityMap;
if (cityMapTemp === undefined){
  cityMap = new CityMap('"Nashville, NY", 36.17, -86.78;"New York, NY", 40.71, -74.00;"Atlanta, NY", 33.75, -84.39;"Denver, CO", 39.74, -104.98;"Seattle, CO", 47.61, -122.33;"Los Angeles, CA", 34.05, -118.24;"Memphis, TN", 35.15, -90.05');
}else{
  let cities = JSON.parse(cityMapTemp);
  cityMap = new CityMap();
  cityMap.cities = cities.map(city => new City(city.name, city.state, city.latitude, city.longitude));
}
let data = getDonutData(cityMap.getCities());

webix.ready(() => {
  webix.ui({
    rows: [
      {
        cols: [
          { view: "text", label: "City name", id: "cityName" },
          { view: "text", label: "State", id: "state" },
          { view: "text", label: "Latitude", id: "latitude" },
          { view: "text", label: "Longitude", id: "longitude" },
          {
            view: "button",
            value: "Add",
            css: "webix_primary",
            heigth: 40,
            width: 100,
            click: () => {
              let cityName = $$("cityName").getValue();
              let state = $$("state").getValue();
              let latitude = $$("latitude").getValue();
              let longitude = $$("longitude").getValue();
              let city = new City(cityName, state, latitude, longitude);
              cityMap.addCity(city);
              localStorage.setItem("cityMap", JSON.stringify(cityMap.getCities()));
              $$("donut").clearAll();
              $$("donut").parse(getDonutData(cityMap.getCities()));
              $$("donut").refresh();
              cityMap.print();
            }
          }
        ]
      },
      {
        view: "chart",
        type: "donut",
        value: "#numOFCities#",
        id: "donut",
        heigth: 300,
        width: 300,
        legend: {
          width: 75,
          align: "right",
          valign: "middle",
          template: "#state#"
        },
        pieInnerText: "#numOFCities#",
        shadow: 0,
        gradient: true,
        data
      },{}
    ]
  });
});
console.log(cityMap.print());
console.log(`Southernmost city is ${cityMap.uttermostCity("South")}`);
console.log(`Easternmost city is ${cityMap.uttermostCity("East")}`);
console.log(`Closest city to the entered coordinates is ${cityMap.closestCity(150,-150)}`);
console.log(`String of states: ${cityMap.StringOfStates()}`);
console.log(`List of cities of entered state:`);
console.log(cityMap.searchByState("NY").forEach(city => {
  city.print();
}));
console.log(cityMap.print());

