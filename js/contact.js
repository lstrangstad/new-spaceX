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

const formOutput = document.querySelector(".contact-form");
const formError = document.querySelector(".error-msg");

formOutput.addEventListener("submit", formValidator);
function formValidator(event) {
  event.preventDefault();

  const fullName = document.querySelector("#fullname");
  const nameError = document.querySelector("#fullname-error");
  const fullnameValue = fullName.value;

  if (nameValidator(fullnameValue) === true) {
    nameError.style.display = "none";
  } else {
    nameError.style.display = "block";
  }

  const mail = document.querySelector("#email");
  const mailError = document.querySelector("#email-error");
  const mailValue = mail.value;

  if (nameValidator(mailValue) === true) {
    mailError.style.display = "none";
  } else {
    mailError.style.display = "block";
  }

  const validMailError = document.querySelector("#valid-email-error");

  if (mailValidator(mailValue) === true) {
    validMailError.style.display = "none";
  } else {
    validMailError.style.display = "block";
  }

  const subject = document.querySelector("#subject");
  const subjectError = document.querySelector("#subject-error");
  const subjectValue = subject.value;

  if (nameValidator(subjectValue) === true) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  const messageInput = document.querySelector("#msg");
  const messageError = document.querySelector("#message-error");
  const messageValue = messageInput.value;

  if (messageValidator(messageValue) === true) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }
}

function nameValidator(string) {
  const inputValue = string.trim();
  if (inputValue.length > 0) {
    return true;
  } else {
    return false;
  }
}

function mailValidator(mail) {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(mail);
}

function messageValidator(message) {
  const trimmedMessage = message.trim();
  if (trimmedMessage.length >= 10) {
    return true;
  } else {
    return false;
  }
}
