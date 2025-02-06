


function validateOnlyLetters(word) {
	let regex = /^[a-zA-Z\s]*$/;
	return regex.test(word);
}

function validateEmail(email) {
	let regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	return regex.test(email);
}

function validateLettersNumbersOnly(password) {
	let regex = /[^A-Za-z0-9]+/g;
	return regex.test(password);
}

function validateNumbersOnly(input) {
	let regex = /^[0-9]+$/;
	return regex.test(input);
}

const errorMessage = (errorDiv, errorInput) => {
	// document.getElementById(htmlID);
	let message =  `Error, ${errorInput} is missing or there is invalid data!`
	errorDiv.innerHTML = message;
}


// Exercise 6
function validate() {
	let error = 0;
	// Get the input fields
	let fName = document.getElementById("fName");
	let fLastname = document.getElementById("fLastN");
	let fEmail = document.getElementById("fEmail");
	let fPassword = document.getElementById("fPassword");
	let fAddress = document.getElementById("fAddress");
	let fPhoneNum = document.getElementById("fPhone");

	// Get the error elements
	let errorName = document.getElementById("errorName");
	let errorLastname = document.getElementById("errorLastN");
	let errorEmail = document.getElementById("errorEmail");
	let errorPassword = document.getElementById("errorPassword");
	let errorAddress = document.getElementById("errorAddress");
	let errorPhoneNum = document.getElementById("errorPhone");


	// Validate fields entered by the user: name, phone, password, and email
	try {
		if (fName.value.length < 3 || validateOnlyLetters(fName.value) == false) {
			error++;
			errorMessage(errorName, "name");
		}

		if (fLastname.value.length < 3 || validateOnlyLetters(fLastname.value) == false) {
			error ++;
			errorMessage(errorLastname, "lastname");
		}
	
		if (fEmail.value.length < 3 || validateEmail(fEmail.value) == false) {
			error++;
			errorMessage(errorEmail, "email");
		}

		if (fPassword.value.length < 3 || validateLettersNumbersOnly(fPassword.value)) {
			error++;
			errorMessage(errorPassword, "password");
		}

		if (fAddress.value.length < 3) {
			error++;
			errorMessage(errorAddress, "address");
		}

		if (fPhoneNum.value.length < 3 || validateNumbersOnly(fPhoneNum.value) == false) {
			error++;
			errorMessage(errorPhoneNum, "phone number");
		}
	
		// if (error > 0) {
		// 	alert("Error");
		// } else {
		// 	alert("OK");
		// }

	} catch (error) {

	}

}