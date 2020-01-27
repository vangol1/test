export class City{
	constructor(name, state, latitude, longitude){
    this.name = name
    this.state = state
    this.latitude = latitude
    this.longitude = longitude
  }
  print(){
    console.log(this.name + " " + this.state + " " + this.latitude  + " " + this.longitude);
  }
}