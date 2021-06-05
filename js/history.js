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
}

fetch("https://api.spacexdata.com/v3/history")
  .then((response) => response.json())
  .then((json) => historyContent(json))
  .catch((error) => console.log(error));

function historyContent(json) {
  const historyContainer = document.querySelector(".container");
  console.log(json);

  let html = "";

  json.reverse().forEach((result) => {
    let newDate = result.event_date_utc.slice(0, 10);
    html += ` 
    <div class="timeline">
      <span class="dot"></span>
      <div class="box">
        <div class="content-box">
          <div class="top-box">
            <h2>${newDate}</h2>
          </div>
          <h3>${result.title}</h3>
          <p>${result.details}</p>
            <div class="btn-container">
            <a class="button" href="${result.links.article}">More info</a>
          </div>
        </div>
      </div>
  </div>  
    `;
  });
  historyContainer.innerHTML = html;
}
