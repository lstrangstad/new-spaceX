// Fetching from spaceX next launch API
fetch("https://api.spacexdata.com/v3/launches/next")
  .then((response) => response.json())
  .then((json) => nextLaunchInfo(json))
  .catch((error) => console.log(error));

// Function using the fetch
function nextLaunchInfo(json) {
  console.log(json);

  // Get launch date local from json
  let localDate = json.launch_date_local;
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

  const nextLaunchContainer = document.querySelector("#next-launch");
  //What to output in html with variables
  html += `
  <div class="patch">
  <img src="${json.links.mission_patch}" alt="${json.mission_name}">
</div>
<div class="card-content">
  <h2>Next launch</h2>
  <p class="mission-name">${json.mission_name}</p>
  <div class="txt-content">
    <p class="headers">Launch date local</p>
    <p class="fact">${json.launch_date_local.slice(0, 10)}</p> 
    <p class="headers">Rocket name</p>
    <p class="fact">${json.rocket.rocket_name}</p>
    <p class="headers">Launch site</p>
    <p class="fact">${json.launch_site.site_name}</p>
  </div>
  <div class="btn-container">
    <a class="button" href="./launches.html">Upcoming launches</a>
</div>
</div>
`;

  nextLaunchContainer.innerHTML = html;
}

fetch("https://api.spacexdata.com/v3/launches/latest")
  .then((response) => response.json())
  .then((json) => lastLaunchInfo(json))
  .catch((error) => console.log(error));

function lastLaunchInfo(data) {
  console.log(data);

  let html = "";

  const lastLaunchContainer = document.querySelector("#last-launch");

  //What to output in html with variables
  html += `
  <div class="patch">
    <img src="${data.links.mission_patch}" alt="${data.mission_name}">
  </div>
  <div class="card-content">
  <h2>Last launch</h2>
  <p class="mission-name">${data.mission_name}</p>
  <div class="txt-content">
    <p class="headers">Mission name</p>
    
    <p class="headers">Launch date local</p>
    <p class="fact">${data.launch_date_local}</p> 
    <p class="headers">Rocket name</p>
    <p class="fact">${data.rocket.rocket_name}</p>
    <p class="headers">Launch site</p>
    <p class="fact">${data.launch_site.site_name}</p>
  </div>
  <div class="btn-container">
    <a class="button" href="./launches.html">Past launches</a>
</div>
</div>`;

  lastLaunchContainer.innerHTML = html;
}

function imgError(image) {
  image.onerror = "";
  image.src = "./images/patch_coming_soon.png";
  return true;
}
