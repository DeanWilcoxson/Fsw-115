const getData = async () => {
  let listData = document.getElementById("listData");
  try {
    const people = await axios.get("https://swapi.dev/api/people");
    for (var i = 0; i < people.data.results.length; i++) {
      var person = people.data.results[i];

      //List Item (div) Construction
      const div = document.createElement("div");
      const name = document.createElement("h1")
      name.textContent = person.name;
      name.className = "name"
      div.className = "item";
      div.append(name)
      // listData.appendChild(div);

      //Films List Construction
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
        div.appendChild(filmsList);
      }

      //Vehicles List Construction
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
        div.appendChild(vehiclesList);
      }

      //Starships List Construction
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
        div.appendChild(starshipsList);
      }
      
      listData.appendChild(div);
    }
  } catch (error) {
    console.log("error");
  }
};
getData();
