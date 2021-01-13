axios
    .get("https://api.vschool.io/DeanWilcoxson/todo")
    .then((response) => {
        for (let i = 0; i < response.data.length; i++) {
            let data = document.getElementById("todoData");
            const h1 = document.createElement("h1");
            if (response.data[i].completed === true) {
                h1.textContent = `${response.data[i].title}, ${response.data[i].description}: ${response.data[i].price}`;
                h1.style.textDecoration = "line-through";
                h1.style.color = "grey";
            } else
                h1.textContent = `${response.data[i].title}, ${response.data[i].description}: ${response.data[i].price}`;
            data.appendChild(h1);
        }
    })
    .catch((error) => alert("error"));