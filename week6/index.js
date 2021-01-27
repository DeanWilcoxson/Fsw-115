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
      listData.appendChild(div);

      //Films List Construction
      const filmsArray = person.films;
      if (filmsArray.length) {
        let ol = document.createElement("ol");
        ol.innerHTML = "Films";
        ol.className = "filmsList";
        div.appendChild(ol);
        for (var j = 0; j < filmsArray.length; j++) {
          const film = await axios.get(filmsArray[j]);
          const li = document.createElement("li");
          li.textContent = film.data.title;
          li.className = "films";
          ol.appendChild(li);
        }
      }

      //Vehicles List Construction
      const vehiclesArray = person.vehicles;
      if (vehiclesArray.length) {
        let ol = document.createElement("ol");
        ol.innerHTML = "Vehicles";
        ol.className = "vehiclesList";
        div.appendChild(ol);
        for (var l = 0; l < vehiclesArray.length; l++) {
          const vehicle = await axios.get(vehiclesArray[l]);
          const li = document.createElement("li");
          li.textContent = vehicle.data.name;
          li.className = "vehicles";
          ol.appendChild(li);
        }
      }

      //Starships List Construction
      const starShipsArray = person.starships;
      if (starShipsArray.length) {
        let ol = document.createElement("ol");
        ol.textContent = "Starships";
        ol.className = "starshipsList";
        div.appendChild(ol);
        for (var f = 0; f < starShipsArray.length; f++) {
          const starShip = await axios.get(starShipsArray[f]);
          const li = document.createElement("li");
          li.textContent = starShip.data.name;
          li.className = "starships";
          ol.appendChild(li);
        }
      }
    }
  } catch (error) {
    console.log("error");
  }
};
getData();
