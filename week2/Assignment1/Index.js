
const vader = {
    "name": "Darth Vader",
    "height": "202",
    "mass": "136",
    "hair_color": "none",
    "skin_color": "white",
    "eye_color": "yellow",
    "birth_year": "41.9BBY",
    "gender": "male",
    "homeworld": "http://swapi.dev/api/planets/1/",
    "films": [
        "http://swapi.dev/api/films/1/",
        "http://swapi.dev/api/films/2/",
        "http://swapi.dev/api/films/3/",
        "http://swapi.dev/api/films/6/"
    ],
    "species": [],
    "vehicles": [],
    "starships": [
        "http://swapi.dev/api/starships/13/"
    ],
    "created": "2014-12-10T15:18:20.704000Z",
    "edited": "2014-12-20T21:17:50.313000Z",
    "url": "http://swapi.dev/api/people/4/"
}
let data = JSON.stringify(vader, null, 4);
let objectData = document.getElementById("objectData");
objectData.textContent = data;