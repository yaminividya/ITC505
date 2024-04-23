// Wait for the DOM content to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Get the submit button element
    var submitButton = document.querySelector("#signupForm button[type='button']");

    // Add event listener to the submit button
    submitButton.addEventListener("click", function(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Call the validateForm function
        validateForm();
    });
});

function validateForm() {
  var firstName = sanitizeInput(document.forms["myForm"]["firstName"].value);
  var lastName = sanitizeInput(document.forms["myForm"]["lastName"].value);
  var email = sanitizeInput(document.forms["myForm"]["email"].value);
  var password = sanitizeInput(document.forms["myForm"]["password"].value);
  var confirmPassword = sanitizeInput(document.forms["myForm"]["confirmPassword"].value);
  var errorMessage = "";

  if (firstName == "") {
    errorMessage += "First name is required.<br>";
  }

  if (lastName == "") {
    errorMessage += "Last name is required.<br>";
  }

  if (email == "") {
    errorMessage += "Email is required.<br>";
  } else {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      errorMessage += "Invalid email address.<br>";
    }
  }

  if (password == "") {
    errorMessage += "Password is required.<br>";
  }

  if (confirmPassword == "") {
    errorMessage += "Confirm password is required.<br>";
  }

  if (password !== confirmPassword) {
    errorMessage += "Passwords do not match.<br>";
  }

  if (errorMessage !== "") {
    document.getElementById("submitMessage").innerHTML = errorMessage;
    document.getElementById("submitMessage").classList.add("error");
    return false;
  }

  document.getElementById("submitMessage").innerHTML = "Thanks for filling the details!";
  document.getElementById("submitMessage").classList.add("success");

  // Reset form
  document.getElementById("signupForm").reset();

  return false;
}

function sanitizeInput(input) {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
