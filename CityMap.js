import { City } from "./City.js";
export class CityMap {
  constructor(str) {
    if (str) {
      str = str.replace(/"/g, "");
      let strArray = str.split(";");
      this.cities = strArray.map(city => {
        let cityArray = city.split(",");
        return new City(cityArray[0].trim(), cityArray[1].trim(), cityArray[2].trim(), cityArray[3].trim());
      });
    } else {
      this.cities = [];
    }
  }
  print() {
    this.cities.forEach(city => city.print());
  }
  closestCity(latitude, longitude) {
    let findDistance = (latitude1, longitude1, latitude2, longitude2) =>
      Math.sqrt(
        Math.pow(latitude1 - latitude2, 2) +
          Math.pow(longitude1 - longitude2, 2)
      );
    let pairs = this.cities.map(city => {
      let cityPair = {
        name: city.name,
        distance: findDistance(
          latitude,
          longitude,
          city.latitude,
          city.longitude
        )
      };
      return cityPair;
    });
    pairs.sort((a, b) => (a.distance > b.distance ? 1 : -1));
    return pairs[0].name;
  }
  StringOfStates() {
    let statesArray = this.cities.map(city => city.state);
    let statesSet = new Set(statesArray);
    return Array.from(statesSet).join(" ").trim();
  }
  searchByState(state) {
    let result = [];
    this.cities.map(city => {
      if (city.state === state) result.push(city);
    });
    return result;
  }
  uttermostCity(direction) {
    let pairs = {};
    let createPairWithLatitude = () =>{
      return this.cities.map(city =>{
        return { name: city.name, latitude: city.latitude };
      });
    }
    let createPairWithLongitude = () =>{
      return this.cities.map(city =>{
        return { name: city.name, longitude: city.longitude };
      });
    }
    switch (direction) {
      case "North":
        pairs = createPairWithLatitude();
        pairs.sort((a, b) => a.latitude - b.latitude);
        return pairs[pairs.length - 1].name;
        break;
      case "South":
        pairs = createPairWithLatitude();
        pairs.sort((a, b) => a.latitude - b.latitude);
        console.log(pairs);
        return pairs[0].name;
        break;
      case "East":
        pairs = createPairWithLongitude();
        pairs.sort((a, b) => a.longitude - b.longitude);
        return pairs[pairs.length - 1].name
        break;
      case "West":
        pairs = createPairWithLongitude();
        pairs.sort((a, b) => a.longitude - b.longitude);
        return pairs[0].name;
        break;
      default:
        return "Error. Wrong direction.";
        break;
    }
  }
  addCity(city) {
    this.cities.push(city);
  }
  getCities() {
    return this.cities;
  }
}
