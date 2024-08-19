function updateDate() {
  var dateElement = document.getElementById("date");
  var date = new Date(); //get the eastern europian time which appears as "Sun Aug 11 2024 20:14:26 GMT+0300"

  var day = { weekday: "long" };
  var weekDay = date.toLocaleString(undefined, day);
  var optionsMonth = { month: "short" };
  var month = date.toLocaleString(undefined, optionsMonth).replace(".", "");

  var formattedDate = `${weekDay}, ${date.getDate()} ${month}. ${date.getFullYear()}`;

  // Update the content of the <p> element with the current date
  dateElement.innerText = formattedDate;
}

function updateTime() {
  var timeElement = document.getElementById("time");
  var options = { hour: "2-digit", minute: "2-digit" };
  timeElement.textContent = new Date()
    .toLocaleTimeString("en-US", options)
    .replace(/AM|PM/, "");
}

updateDate();
updateTime();

setInterval(updateTime, 1000);
setInterval(updateDate, 24 * 60 * 60 * 1000);

/////////////////////////////////////////////////

let timerInterval;
let seconds = 0;
let isPaused = false;

function startTimer() {
  timerInterval = setInterval(() => {
    if (!isPaused) {
      seconds++;
      const minutes = Math.floor(seconds / 60);
      const displaySeconds = seconds % 60;
      document.getElementById("timer").textContent = `${minutes
        .toString()
        .padStart(2, "0")}:${displaySeconds.toString().padStart(2, "0")}`;
    }
  }, 1000);
}

document.getElementById("start-work").addEventListener("click", () => {
  const startBtn = document.getElementById("start-work");
  const finishBtn = document.getElementById("finish-work");

  if (startBtn.textContent === "Start Work") {
    if (!timerInterval) {
      startTimer();
      finishBtn.style.display = "inline-block"; // Show the finish button
    }
    startBtn.textContent = "Pause";
    startBtn.classList.add("pause");
  } else if (startBtn.textContent === "Pause") {
    isPaused = true;
    startBtn.textContent = "Resume";
    startBtn.classList.add("resume");
    startBtn.classList.remove("pause"); // Change color for Resume
  } else if (startBtn.textContent === "Resume") {
    isPaused = false;
    startBtn.textContent = "Pause";
    startBtn.classList.add("pause");
    startBtn.classList.remove("resume"); // Revert color back
  }
});

document.getElementById("finish-work").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  document.getElementById("timer").textContent = "00:00"; // Reset the timer display
  document.getElementById("start-work").textContent = "Start Work";
  document.getElementById("start-work").classList.remove("resume");
  document.getElementById("start-work").classList.remove("pause"); // Ensure color reset
  document.getElementById("finish-work").style.display = "none";
});

// Function to apply the dark theme
function applyDarkTheme() {
  document.body.classList.add("dark-theme");
  document.querySelector(".upper").classList.add("dark-theme");
  document.querySelector(".profile-container").classList.add("dark-theme");
  document.querySelector(".work-timer").classList.add("dark-theme");
}

// Function to apply the light theme
function applyLightTheme() {
  document.body.classList.remove("dark-theme");
  document.querySelector(".upper").classList.remove("dark-theme");
  document.querySelector(".profile-container").classList.remove("dark-theme");
  document.querySelector(".work-timer").classList.remove("dark-theme");
}

// Attach event listeners to the theme squares
document.getElementById("dark").addEventListener("click", applyDarkTheme);
document.getElementById("light").addEventListener("click", applyLightTheme);


var profileName = document.getElementById("name")
profileName.innerHTML = localStorage.getItem('userName')