const otherData = document.getElementById("SwApi1");
otherData.addEventListener("click", function() {
    axios.get("https://swapi.dev/api/planets")
        .then(response => {
            for (i = 0; i < response.data.results.length; i++) {
                const h1 = document.createElement("h1");
                h1.innerHTML = `${response.data.results[i].name}`
                document.body.append(h1)
            }
        })
        .catch((error) => alert("error"))
})