let data = document.getElementById("todoData");
let form = document.formName;
function deleteData() {
  data.innerHTML = "TO-DO List";
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const newItem = {
    title: form.title.value,
    description: form.description.value,
    price: form.price.value,
    completed: form.completed.checked,
  };
  console.log(newItem);
  axios.post("https://api.vschool.io/DeanWilcoxson/todo", newItem)
    .then(form.reset())
    .then(deleteData())
    .then((response) => getData())
    .catch((error) => alert("error"));
});
let updateComplete = (e) => {
  let checkBox = document.getElementsByClassName("checkBox");
  for (i = 0; i < checkBox.length; i++) {
    if (e.target == checkBox[i]) {
      let item = checkBox[i].parentNode;
      if (checkBox[i].checked) {
        item.style.textDecoration = "line-through";
        item.style.color = "grey";
        item.style.border = "1px solid black";
        checkBox[i].checked = true;
      } else {
        item.style.border = "1px solid black";
        checkBox[i].checked = false;
        item.style.textDecoration = "none";
        item.style.color = "black";
      }
      let id = item.id;
      let comp = {
        completed: checkBox[i].checked,
      };
      axios.put(`https://api.vschool.io/DeanWilcoxson/todo/${id}`, comp);
    }
  }
};

async function getData() {
  axios.get("https://api.vschool.io/DeanWilcoxson/todo")
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        
        const item = document.createElement("div");
        item.setAttribute(`id`, response.data[i]._id);
        item.textContent = `Title: ${response.data[i].title}, Description: ${response.data[i].description}`;
        item.style.display = "flex";
        item.style.flexDirection = "row";
        item.style.alignItems = "center";
        item.style.justifyContent = "space-between";
        item.style.backgroundColor = "beige";
        
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkBox";
        checkbox.onchange = updateComplete;
        item.append(checkbox);
        
        const deleteButton = document.createElement("button");
        deleteButton.classList = "delete";
        deleteButton.textContent = "X";
        deleteButton.style.backgroundColor = "red";
        item.append(deleteButton);
        
        if (response.data[i].completed === true) {
          item.style.textDecoration = "line-through";
          item.style.color = "grey";
          item.style.border = "1px solid black";
          checkbox.checked = true;
        } else {
          item.style.border = "1px solid black";
        }
        data.appendChild(item);
        
        item.addEventListener("click", function (e) {
          let deleteButton = document.getElementsByClassName("delete");
          for (i = 0; i < deleteButton.length; i++) {
            if (e.target === deleteButton[i]) {
              let deleted = deleteButton[i].parentNode;
              console.log(deleted);
              let x = deleted.id;
              console.log(x);
              axios
                .delete(`https://api.vschool.io/DeanWilcoxson/todo/${x}`)
                .then()
                .catch((error) => alert("error"));
              data.removeChild(deleted);
            }
          }
        });
      }
    })
    .catch((error) => alert("error"));
}
getData();