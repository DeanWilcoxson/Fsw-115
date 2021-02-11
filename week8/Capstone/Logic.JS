const getIt = async () => {
  let jobs = document.getElementsByClassName("jobItem");
  while (jobs[0]) {
    jobs[0].remove();
  }
  try {
    let info = await axios.get("https://api.vschool.io/DeanWilcoxson/todo");
    let infoData = info.data;

    let employees = await axios.get("https://swapi.dev/api/people/");
    let employeeData = employees.data.results;

    let planets = await axios.get("https://swapi.dev/api/planets/");
    let planetData = planets.data.results;

    displayJob(infoData, employeeData, planetData);
  } catch (error) {
    alert("Error!!! Refer to Console");
    console.log(error);
  }
};
const updateIt = async (newObject, e) => {
  // console.log(newObject, e)
  await axios
    .put(`https://api.vschool.io/DeanWilcoxson/todo/${e}`, newObject)
    .then((res) => {
      getIt();
    })
    .catch((error) => console.log("error"));
};

const deleteIt = (e) => {
  console.log(e)
  axios
    .delete(`https://api.vschool.io/DeanWilcoxson/todo/${e}`)
    .then((res) => {
      getIt();
    })
    .catch((error) => console.log(error));
};

let deleteButton = document.getElementsByClassName("del");
for (let i = 0; i < deleteButton.length; i++) {
  deleteButton.addEventListener("click", deleteIt);
}

const postIt = (e) => {
  e.preventDefault();
  let form = document.form;
  let newJobRequest = {
    title: form.title.value,
    description: form.description.value,
    price: form.price.value,
  };
  axios
    .post("https://api.vschool.io/DeanWilcoxson/todo", newJobRequest)
    .then(form.reset())
    .then(deleteIt())
    .then(getIt())
    .catch((error) => {
      console.log(error);
    });
};
let postBtn = document.getElementById("request");
postBtn.addEventListener("click", postIt);

const displayJob = async (infoData, employeeData, planetData) => {
  let workerName = await getName(employeeData);
  let jobInfo = await getInfo(infoData);
  let homeWorld = await getPlanet(planetData);
  // console.log(workerName, jobInfo, homeWorld);
  let length;
  if (
    infoData.length <= employeeData.length &&
    infoData.length <= planetData.length
  ) {
    length = infoData.length;
  } else if (
    employeeData.length <= infoData.length &&
    employeeData.length <= planetData.length
  ) {
    length = employeeData.length;
  } else if (
    planetData.length <= employeeData.length &&
    planetData.length <= infoData.length
  ) {
    length = planetData.length;
  } else {
    console.log(infoData, employeeData, planetData);
  }
  for (let i = 0; i < length; i++) {
    // console.log(length)
    let jobData = document.createElement("div");
    jobInfo[i].append(workerName[i], homeWorld[i]);
    jobData.append(jobInfo[i]);
    let listData = document.getElementById("listData");
    listData.append(jobData);
    jobData.className = "jobItem";
    // console.log(jobData, listData);
  }
};

const getInfo = async (infoData) => {
  var arr = [];
  if (infoData.length) {
    // console.log(infoData, infoData.length);
    for (let i = 0; i < infoData.length; i++) {
      let jobInfo = document.createElement("div");
      jobInfo.className = "jobInfo";

      let jobTitle = document.createElement("h1");
      jobTitle.className = "jobTitle";
      jobTitle.textContent = `Job: ${infoData[i].title}`;

      let jobDesc = document.createElement("p");
      jobDesc.className = "jobDesc";
      jobDesc.textContent = `Description: ${infoData[i].description}`;

      let jobCost = document.createElement("p");
      jobCost.className = "jobCost";
      jobCost.textContent = `Funds: ${infoData[i].price}$`;

      let jobETA = document.createElement("p");
      jobETA.className = "estimated";
      jobETA.textContent = `ETA: ${Math.floor(Math.random() * 10) + 1} hours`;

      let delBtn = document.createElement("button");
      delBtn.innerHTML = "X";
      delBtn.className = "del";
      delBtn.addEventListener("click", function (x) {
        deleteIt(infoData[i]._id);
      });

      let editBtn = document.createElement("button");
      editBtn.innerHTML = "edit";
      editBtn.className = "edit";

      editBtn.addEventListener("click", function () {
        let newObject = {
          title: formTitle.value,
          description: formDesc.value,
          price: formPrice.value,
        };
        editForm.classList.toggle("editForm");
        editForm.classList.value === "editForm" &&
          updateIt(newObject, infoData[i]._id);
      });

      let editForm = document.createElement("form");
      editForm.className = "editForm";

      let formTitle = document.createElement("input");
      formTitle.value = infoData[i].title;

      let formDesc = document.createElement("input");
      formDesc.value = infoData[i].description;

      let formPrice = document.createElement("input");
      formPrice.value = infoData[i].price;

      editForm.append(formTitle, formDesc, formPrice);
      jobInfo.append(editForm);

      jobInfo.append(jobTitle, jobDesc, jobCost, jobETA, delBtn, editBtn);
      // return jobInfo;
      arr.push(jobInfo);
    }
    // return jobInfo;
    return arr;
  } else return "";
};

const getName = async (employeeData) => {
  var arr = [];
  if (employeeData.length) {
    // console.log(employeeData, employeeData.length);
    for (let i = 0; i < employeeData.length; i++) {
      let employeeName = document.createElement("p");
      employeeName.className = "worker";
      employeeName.textContent = `Worker Assigned to Job: ${employeeData[i].name}`;

      // return employeeName;
      arr.push(employeeName);
    }
    // return employeeName;
    return arr;
  } else return "";
};

const getPlanet = async (planetData) => {
  var arr = [];
  // console.log(planetData, planetData.length);
  if (planetData.length) {
    for (let i = 0; i < planetData.length; i++) {
      let planetName = document.createElement("p");
      planetName.className = "planet";
      planetName.textContent = `Homeworld: ${planetData[i].name}`;

      // return planetName;
      arr.push(planetName);
    }
    // return planetName;
    return arr;
  } else return "";
};

getIt();
