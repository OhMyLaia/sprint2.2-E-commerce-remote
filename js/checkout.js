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
		if (fName.value.length < 3 || validateOnlyLetters(fName.value) == false) {
			error++;
			errorName.style.display = "block";
		} else {
			errorName.style.display = "none";
		}

		if (fLastname.value.length < 3 || validateOnlyLetters(fLastname.value) == false) {
			error ++;
			errorLastname.style.display = "block";
		} else {
			errorLastname.style.display = "none";
		}
	
		if (fEmail.value.length < 3 || validateEmail(fEmail.value) == false) {
			error++;
			errorEmail.style.display = "block";
		} else {
			errorEmail.style.display = "none";
		}

		if (fPassword.value.length < 3 || validateLettersNumbersOnly(fPassword.value)) {
			error++;
			errorPassword.style.display = "block";
		} else {
			errorPassword.style.display = "none";
		}

		if (fAddress.value.length < 3) {
			error++;
			errorAddress.style.display = "block";
		} else {
			errorAddress.style.display = "none";
		}

		if (fPhoneNum.value.length < 3 || validateNumbersOnly(fPhoneNum.value) == false) {
			error++;
			errorPhoneNum.style.display = "block";
		} else {
			errorPhoneNum.style.display = "none";
		}
	
		// if (error > 0) {
		// 	alert("Error");
		// } else {
		// 	alert("OK");
		// }


}
