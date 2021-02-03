let listData = document.getElementById("listData");

const getData = async () => {
  try {
    const people = await axios.get("https://swapi.dev/api/people/");
    getPerson(people);
  } catch (error) {
    console.log(error);
  }
};

async function getPerson(people) {
  for (let i = 0; i < people.data.results.length; i++) {
    let person = people.data.results[i];

    let personVehicles = await getVehicles(person);
    let personFilms = await getFilms(person);
    let personStarships = await getStarships(person);

    const personData = document.createElement("div");
    personData.className = "item";
    
    const personName = document.createElement("h1");
    personName.textContent = person.name;
    personName.className = "name";
    
    personData.append(personName);
    personData.append(personFilms);
    personData.append(personVehicles);
    personData.append(personStarships);
    listData.appendChild(personData);
  }
}

async function getVehicles(person) {
  const vehiclesArray = person.vehicles;
  
  if (vehiclesArray.length) {
    let vehiclesList = document.createElement("ol");
    vehiclesList.innerHTML = "Vehicles";
    vehiclesList.className = "vehiclesList";
    
    for (var l = 0; l < vehiclesArray.length; l++) {
      const vehicle = await axios.get(vehiclesArray[l]);
      const li = document.createElement("li");
      li.textContent = vehicle.data.name;
      li.className = "vehicles";
      vehiclesList.appendChild(li);
    }
    
    return vehiclesList;
  } else {
    return "";
  }
}

async function getFilms(person) {
  const filmsArray = person.films;
  if (filmsArray.length) {
    let filmsList = document.createElement("ol");
    filmsList.innerHTML = "Films";
    filmsList.className = "filmsList";
    for (var j = 0; j < filmsArray.length; j++) {
      const film = await axios.get(filmsArray[j]);
      const li = document.createElement("li");
      li.textContent = film.data.title;
      li.className = "films";
      filmsList.appendChild(li);
    }
    return filmsList;
  } else {
    return "";
  }
}

async function getStarships(person) {
  const starShipsArray = person.starships;
  if (starShipsArray.length) {
    let starshipsList = document.createElement("ol");
    starshipsList.textContent = "Starships";
    starshipsList.className = "starshipsList";
    for (var f = 0; f < starShipsArray.length; f++) {
      const starShip = await axios.get(starShipsArray[f]);
      const li = document.createElement("li");
      li.textContent = starShip.data.name;
      li.className = "starships";
      starshipsList.appendChild(li);
    }
    return starshipsList;
  } else {
    return "";
  }
}

getData();
