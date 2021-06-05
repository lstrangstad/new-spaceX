fetch("https://api.spacexdata.com/v3/launches/upcoming/")
  .then((response) => response.json())
  .then((json) => nextLaunchesInfo(json))
  .catch((error) => console.log(error));

function nextLaunchesInfo(json) {
  console.log(json);

  // Get launch date local from json
  let localDate = json[0].launch_date_local;
  // Takes first 10 characters
  let updatedDate = localDate.slice(0, 10);
  // Time of launch
  let dateOfLaunch = new Date(updatedDate).getTime();

  // Update count every 1 second
  let counter = setInterval(function () {
    // Get todays date
    let today = new Date().getTime();

    // The difference between now and count down
    let difference = dateOfLaunch - today;

    // Time calculations for days, hours, minutes and seconds
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Display result in class of count
    const counterContainer = document.querySelector(".count");
    //What to output in html with variables
    let htmlClock = "";
    htmlClock += `
      <div class="countdown">
      <span id="days">${days}</span>
      <p>DAYS</p>
    </div>
    <div class="countdown">
      <span id="hours">${hours}</span>
      <p>HOURS</p>
    </div>
    <div class="countdown">
      <span id="minutes">${minutes}</span>
      <p>MINUTES</p>
    </div>
    <div class="countdown">
      <span id="seconds">${seconds}</span>
      <p>SECONDS</p>
    </div> `;

    counterContainer.innerHTML = htmlClock;

    // If the count down is finished, write some text
    if (difference < 0) {
      clearInterval(counter);
      document.querySelector(".count").innerHTML = "No upcoming launch yet...";
    }
  }, 1000);

  let html = "";

  const nextLaunchesContainer = document.querySelector(".upcoming-container");

  json.slice(0).forEach((result) => {
    let manufacturerUnknown = "Unknown";
    if (result.rocket.second_stage.payloads[0].manufacturer) {
      manufacturerUnknown = result.rocket.second_stage.payloads[0].manufacturer;
    }
    let missionPatch = "";
    if (result.links.mission_patch === null) {
      missionPatch = `<img class="patch-img" src="./images/placeholder_patch.png" alt="Mission patch for ${result.mission_name} not found">`;
    } else {
      missionPatch = `<img class="patch-img" src="${result.links.mission_patch}" alt="Mission patch for ${result.mission_name}">`;
    }

    html += `
    <div class="card" id="next-info">
        <div class="patch">
          ${missionPatch}
        </div>
        <div class="card-info">
        <p class="headers">Mission name:</p>
        <p class="fact">${result.mission_name}</p>
        <p class="headers">Launch date:</p>
        <p class="fact">${result.launch_date_local}</p>
        <p class="headers">Rocket name:</p>
        <p class="fact">${result.rocket.rocket_name}</p>
        <p class="headers">Nationality:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].nationality}</p>
        <p class="headers" id="manufacturer">Manufacturer:</p>
        <p class="fact">${manufacturerUnknown}</p>
        <p class="headers">Payload type:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].payload_type}</p>
        <p class="headers">Orbit:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].orbit}</p>
        <p class="headers">Launch site:</p>
        <p class="fact">${result.launch_site.site_name}</p>
        </div>
      </div>`;
  });
  nextLaunchesContainer.innerHTML = html;
}

fetch("https://api.spacexdata.com/v3/launches/past")
  .then((response) => response.json())
  .then((data) => pastLaunchesInfo(data))
  .catch((error) => console.log(error));

function pastLaunchesInfo(data) {
  let reversedData = data.reverse().slice(0, 15);

  let html = "";

  const pastLaunchesContainer = document.querySelector(".past-container");

  reversedData.forEach((result) => {
    let missionPatch = "";
    if (result.links.mission_patch === null) {
      missionPatch = `<img class="patch-img" src="./images/placeholder_patch.png" alt="Mission patch for ${result.mission_name} not found">`;
    } else {
      missionPatch = `<img class="patch" src="${result.links.mission_patch}" alt="Mission patch for ${result.mission_name}">`;
    }

    html += `
    <div class="card" id="past-info">
        <div class="patch">
          ${missionPatch}
        </div>
        <div class="card-info">
        <p class="headers">Mission name:</p>
        <p class="fact">${result.mission_name}</p>
        <p class="headers">Launch date:</p>
        <p class="fact">${result.launch_date_local}</p>
        <p class="headers">Rocket name:</p>
        <p class="fact">${result.rocket.rocket_name}</p>
        <p class="headers">Nationality:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].nationality}</p>
        <p class="headers" id="manufacturer">Manufacturer:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].manufacturer}</p>
        <p class="headers">Payload type:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].payload_type}</p>
        <p class="headers">Orbit:</p>
        <p class="fact">${result.rocket.second_stage.payloads[0].orbit}</p>
        <p class="headers">Launch site:</p>
        <p class="fact">${result.launch_site.site_name}</p>
        </div>
      </div>`;
  });
  pastLaunchesContainer.innerHTML = html;
}
