let form = document.formName;
form.style.border = "3px solid blue";
form.style.width = "200px";
form.style.display = "flex";
form.style.flexDirection = "column";
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const newItem = {
    title: form.title.value,
    description: form.description.value,
    price: form.price.value,
    completed: form.completed.checked,
  };
  axios
    .post("https://api.vschool.io/DeanWilcoxson/todo", newItem)
    .then((response) => console.log(response.data))
    .catch((error) => alert("error"));
});

async function getData() {
  axios
    .get("https://api.vschool.io/DeanWilcoxson/todo")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let data = document.getElementById("todoData");

        const p = document.createElement("p");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const deleteButton = document.createElement("button");
        deleteButton.classList = "delete";
        deleteButton.textContent = "delete";

        const editButton = document.createElement("button");
        editButton.textContent = "edit";
        
        if (response.data[i].completed === true) {
          p.textContent = `Title: ${response.data[i].title}, Description: ${response.data[i].description}, Price: ${response.data[i].price}`;
          p.style.textDecoration = "line-through";
          p.style.color = "grey";
          p.style.border = "1px solid black";
          checkbox.checked = true;
        } 
        
        else {
          p.textContent = `Title: ${response.data[i].title}, Description: ${response.data[i].description}, Price: ${response.data[i].price}`;
          p.style.border = "1px solid black";
        }

        p.style.display = "flex";
        p.style.flexDirection = "row";
        p.style.alignItems = "center";
        p.style.justifyContent = "space-around";
        p.append(editButton);
        p.append(deleteButton);
        p.append(checkbox);
        data.appendChild(p);

        p.addEventListener("click", function (e) {
          let deleteButton = document.getElementsByClassName("delete");
          for (i = 0; i < deleteButton.length; i++) {
            if (e.target === deleteButton[i]) {
              let deleted = deleteButton[i].parentNode;
              axios
                .delete("https://api.vschool.io/DeanWilcoxson/todo")
                .then()
                .catch((error) => alert("error"));
              p.remove(deleted);
            }
          }
        });
      }
    })
    .catch((error) => alert("error"));
}
