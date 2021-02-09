const getIt = async () => {
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

const displayJob = async (infoData, employeeData, planetData) => {
  let workerName = await getName(employeeData);
  let jobInfo = await getInfo(infoData);
  let homeWorld = await getPlanet(planetData);

  let jobData = document.createElement("div");
  jobData.className = "jobItem";
  
  jobInfo.append(workerName, homeWorld);
  jobData.append(jobInfo, workerName, homeWorld);

  let listData = document.getElementById("listData");
  listData.append(jobData);
};

const getInfo = async (infoData) => {
  if (infoData.length) {
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

      jobInfo.append(jobTitle);
      jobInfo.append(jobDesc);
      jobInfo.append(jobCost);
      jobInfo.append(jobETA);

      return jobInfo;
    }
    return jobInfo;
  } else return "";
};

const getName = async (employeeData) => {
  if (employeeData.length) {
    for (let i = 0; i < employeeData.length; i++) {
      let employeeName = document.createElement("p");
      employeeName.className = "worker";
      employeeName.textContent = `Worker Assigned to Job: ${employeeData[i].name}`;

      return employeeName;
    }
    return employeeName;
  } else return "";
};

const getPlanet = async (planetData) => {
  if (planetData.length) {
    for (let i = 0; i < planetData.length; i++) {
      let planetName = document.createElement("p");
      planetName.className = "planet";
      planetName.textContent = `Homeworld: ${planetData[i].name}`;

      return planetName;
    }
    return planetName;
  } else return "";
};

const postIt = () => {
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
    .then((response) => getIt())
    .catch((error) => {
      alert("error");
      console.log(error);
    });
};

const updateIt = () => {};

const deleteIt = () => {};
getIt();
