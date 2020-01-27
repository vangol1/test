export const getDonutData = cities => {
  let states = {};
  cities.forEach(city => {
    if (states[city.state]) {
      states[city.state]++;
    } else {
      states[city.state] = 1;
    }
  });
  return Object.keys(states).map(key => {
    return { state: key, numOFCities: states[key] };
  });
};
