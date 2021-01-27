const getData = async () => {
  let listData = document.getElementById("listData");
  try {
    const people = await axios.get("https://swapi.dev/api/people");
    for (var i = 0; i < people.data.results.length; i++) {
      var person = people.data.results[i];

      const div = document.createElement("div");
      div.textContent = person.name;
      div.style.display = "flex"
      div.style.flexDirection = "row"
      div.style.justifyContent = "flex-start"
      listData.appendChild(div);

      //Films Construction
      const filmsArray = person.films;
      if (filmsArray.length) {
        let ol = document.createElement("ol");
        ol.innerHTML = "Films";
        div.appendChild(ol);
        for (var j = 0; j < filmsArray.length; j++) {
          const film = await axios.get(filmsArray[j]);
          const li = document.createElement("li");
          li.textContent = film.data.title;
          ol.appendChild(li);
        }
      }

      //Vehicles Construction
      const vehiclesArray = person.vehicles;
      if (vehiclesArray.length) {
        let ol = document.createElement("ol");
        ol.innerHTML = "Vehicles";
        div.appendChild(ol);
        for (var l = 0; l < vehiclesArray.length; l++) {
          const vehicle = await axios.get(vehiclesArray[l]);
          const li = document.createElement("li");
          li.textContent = vehicle.data.name;
          ol.appendChild(li);
        }
      }

      //Starships Construction
      const starShipsArray = person.starships;
      if (starShipsArray.length) {
        let ol = document.createElement("ol");
        ol.textContent = "Starships";
        div.appendChild(ol);
        for (var f = 0; f < starShipsArray.length; f++) {
          const starShip = await axios.get(starShipsArray[f]);
          const li = document.createElement("li");
          li.textContent = starShip.data.name;
          ol.appendChild(li);
        }
      }

    }
  } catch (error) {
    console.log("error");
  }
};
getData();