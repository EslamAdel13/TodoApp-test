function updateDate() {
    var dateElement = document.getElementById("date");
    var date = new Date(); //get the eastern europian time which appears as "Sun Aug 11 2024 20:14:26 GMT+0300"
    
    var day = { weekday: 'long'};
    var weekDay = date.toLocaleString(undefined, day);
    var optionsMonth = { month: 'short' };
    var month = date.toLocaleString(undefined, optionsMonth).replace('.', '');
    
    dateElement.innerText = `${weekDay}, ${date.getDate()} ${month}. ${date.getFullYear()}`;
}

function updateTime() {
   var timeElement = document.getElementById("time"); 
   var options = {hour: '2-digit', minute: '2-digit' }
   timeElement.innerText = new Date().toLocaleTimeString('en-US', options).replace(/AM|PM/,'') ;
}

document.querySelector('.password-toggle-icon').addEventListener('click', function() {
    var passwordField = document.getElementById('password');
    var icon = this.querySelector('i');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    } else {
        passwordField.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    }
});

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validateName(name) {
    var re = /^[A-Za-z\s]+$/;
    return re.test(String(name));
}

function handleSubmit() {
    var email = document.getElementById('email').value;
    var name = document.getElementById('full-name').value;
    var password = document.getElementById('password').value;
    
    var isValid = true;

    // Validate Name
    if (name.trim() === "") {
        document.getElementById('name-error').innerText = "Required field.";
        document.getElementById('name-error').style.visibility = 'visible';
        isValid = false;
    } else if (!validateName(name)) {
        document.getElementById('name-error').innerText = "Name cannot contain numbers.";
        document.getElementById('name-error').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('name-error').style.visibility = 'hidden';
        
    }

    // Validate Email
    if (email.trim() === "") {
        document.getElementById('email-error').innerText = "Required field.";
        document.getElementById('email-error').style.visibility = 'visible';
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById('email-error').innerText = "Invalid email format.";
        document.getElementById('email-error').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('email-error').style.visibility = 'hidden';
      
    }

    // Validate Password
    if (password.trim() === "") {
        document.getElementById('password-error').innerText = "Required field.";
        document.getElementById('password-error').style.visibility = 'visible';
        isValid = false;
    } else {
        document.getElementById('password-error').style.visibility = 'hidden';
       
    }

    // If all fields are valid, proceed to the next page
    if (isValid) {
        localStorage.setItem('userName', name); 
        window.location.href = './Dashboard/dashboard.html';
    }
}


updateDate();
updateTime();

setInterval(updateTime, 1000);
setInterval(updateDate, 24 * 60 * 60 * 1000);




