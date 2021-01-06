const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if ((xhr.readyState === 4) && (xhr.status === 200)) {
        const jsonData = xhr.responseText;
        const data = JSON.parse(jsonData);
        const object = data.objects[0];
        const pikachu = object.pokemon;
        pokemon(pikachu);
    }
};

function pokemon(arr) {
    arr.map(function(pokemon) {
        let div = document.createElement("div");
        let li = document.getElementById("objectData")
        div.textContent = pokemon.name;
        li.append(div)
    })
}

xhr.open("GET", "https://api.vschool.io/pokemon", true);
xhr.send();