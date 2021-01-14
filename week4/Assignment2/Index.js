function people() {
    axios.get("https://swapi.dev/api/people")
        .then((response) => {
            for (i = 0; i < response.data.results.length; i++) {
                const h1 = document.createElement("h1");
                h1.innerHTML = `${response.data.results[i].name}`;
                h1.style.textAlign = "center";
                h1.style.color = "blue";
                h1.style.backgroundColor = "darkgrey";
                let data = document.getElementById("listData");
                data.append(h1);
            }
        })
        .catch((error) => alert("error"));
}

function planets() {
    axios.get("https://swapi.dev/api/planets")
        .then(response => {
            for (i = 0; i < response.data.results.length; i++) {
                const h1 = document.createElement("h1");
                h1.innerHTML = `${response.data.results[i].name}`
                h1.style.textAlign = "center"
                h1.style.color = "blue"
                h1.style.backgroundColor = "darkgrey"
                let data = document.getElementById("listData");
                data.append(h1);
            }
        })
        .catch((error) => alert("error"))
}