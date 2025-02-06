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

const errorMessage = (errorDiv, message) => {
	errorDiv.innerHTML = message;
}


// Exercise 6
export function validate() {
	console.log(`estamos en validate`)
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
	let allFildsRequired = document.getElementById("error-all-fields-required");


	// Validate fields entered by the user: name, phone, password, and email
		if (!fName || fName.value.length < 3 || !validateOnlyLetters(fName.value)) {
			error++;
			errorName.style.display = "block";
			fName.classList.add("is-invalid");
			console.log(`entrando al if`)
		} else {
			errorName.style.display = "none";
		}

		if (!fLastname || fLastname.value.length < 3 || !validateOnlyLetters(fLastname.value)) {
			error ++;
			errorLastname.style.display = "block";
			fLastname.classList.add("is-invalid");
		} else {
			errorLastname.style.display = "none";
		}
	
		if (!fEmail || fEmail.value.length < 3 || !validateEmail(fEmail.value)) {
			error++;
			errorEmail.style.display = "block";
			fEmail.classList.add("is-invalid");
		} else {
			errorEmail.style.display = "none";
		}

		if (!fPassword || fPassword.value.length < 3 || !validateLettersNumbersOnly(fPassword.value)) {
			error++;
			errorPassword.style.display = "block";
			fPassword.classList.add("is-invalid");
		} else {
			errorPassword.style.display = "none";
		}

		if (!fAddress || fAddress.value.length < 3) {
			error++;
			errorAddress.style.display = "block";
			fAddress.classList.add("is-invalid");
		} else {
			errorAddress.style.display = "none";
		}

		if (!fPhoneNum || fPhoneNum.value.length < 3 || !validateNumbersOnly(fPhoneNum.value)) {
			error++;
			errorPhoneNum.style.display = "block";
			fPhoneNum.classList.add("is-invalid");
		} else {
			errorPhoneNum.style.display = "none";
		}
	
		if (error > 0) {
			errorMessage(allFildsRequired, "Please, fill all the inputs. All fields are required.")
		}
}
