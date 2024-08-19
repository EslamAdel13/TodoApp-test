function updateDate() {
    var dateElement = document.getElementById("date");
    var date = new Date(); //get the eastern europian time which appears as "Sun Aug 11 2024 20:14:26 GMT+0300"

    var day = {
        weekday: 'long'
    };
    var weekDay = date.toLocaleString(undefined, day);
    var optionsMonth = {
        month: 'short'
    };
    var month = date.toLocaleString(undefined, optionsMonth).replace('.', '');

    var formattedDate = `${weekDay}, ${date.getDate()} ${month}. ${date.getFullYear()}`;

    // Update the content of the <p> element with the current date
    dateElement.innerText = formattedDate;
}

function updateTime() {
    var timeElement = document.getElementById("time");
    var options = {
        hour: '2-digit',
        minute: '2-digit'
    }
    timeElement.textContent = new Date().toLocaleTimeString('en-US', options).replace(/AM|PM/, '');
}

updateDate();
updateTime();
setInterval(updateTime, 1000);
setInterval(updateDate, 24 * 60 * 60 * 1000);

var taskName = document.getElementById("task-name");

function createCard(taskNameText) {
    console.log("hi");
    var card = document.createElement("div");
    card.classList.add("card");

    // Create task name and date
    var taskSpan = document.createElement("span");
    var taskDate = document.createElement("span");

    // Set the task name to the input value
    taskSpan.innerHTML = taskNameText;
    var formattedDate = new Date().toLocaleDateString(); 
    taskDate.innerHTML = formattedDate;

    card.appendChild(taskSpan);
    card.appendChild(taskDate);

    // Create buttons
    var completeBtn = document.createElement("button");
    var cancelBtn = document.createElement("button");
    completeBtn.innerHTML = "Complete Task";
    cancelBtn.innerHTML = "Cancel Task";

    // Add classes to buttons
    completeBtn.classList.add("complete-task");
    cancelBtn.classList.add("cancel-task");

    // Append buttons to the card
    card.appendChild(completeBtn);
    card.appendChild(cancelBtn);

    // Append the card to the list
    document.querySelector(".list").appendChild(card);

    // Event listener for the Complete Task button
    completeBtn.addEventListener("click", function () {
        if (completeBtn.classList.contains("resume-task")) {
            completeBtn.classList.remove("resume-task");
            taskSpan.style.textDecoration = "none";
            completeBtn.innerHTML = "Complete Task";
            taskDate.style.visibility = "visible";
        } else {
            completeBtn.classList.add("resume-task");
            taskSpan.style.textDecoration = "line-through";
            completeBtn.innerHTML = "Resume Task";
            taskDate.style.visibility = "hidden";
        }
    });

    // Event listener for the Cancel Task button
    cancelBtn.addEventListener("click", function () {
        card.remove();
    });
}

var newTask = document.getElementById("btn");

newTask.addEventListener("click", function () {
    var taskNameText = taskName.value.trim();
    if (taskNameText !== "") {
        createCard(taskNameText);

        // Clear the input field after adding the task
        taskName.value = "";
    } else {
        alert("Please enter a task name.");
    }
});

var profileName = document.getElementById("user");
profileName.innerHTML = localStorage.getItem('userName')

