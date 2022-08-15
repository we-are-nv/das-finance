const firstNameEl = document.querySelector("#firstName");
const lastNameEl = document.querySelector("#lastName");
const emailEl = document.querySelector("#email");
const telephoneEl = document.querySelector("#telephone");
// const checkBox = document.getElementById("accept");
// const submitBtn = document.getElementById("submitButton");

const form = document.querySelector("#newLead");

const checkFirstName = () => {
	let valid = false;

	const firstName = firstNameEl.value.trim();

	if (!isRequired(firstName)) {
		showError(firstNameEl, "First name cannot be left blank");
	} else if (!isFirstNameValid(firstName)) {
		showError(firstNameEl, "First name must only contain letters");
	} else {
		showSuccess(firstNameEl);
		valid = true;
	}
	return valid;
};

const checkLastName = () => {
	let valid = false;

	const lastName = lastNameEl.value.trim();

	if (!isRequired(lastName)) {
		showError(lastNameEl, "Last name cannot be left blank");
	} else if (!isLastNameValid(lastName)) {
		showError(lastNameEl, "Last name must only contain letters");
	} else {
		showSuccess(lastNameEl);
		valid = true;
	}
	return valid;
};

const checkEmail = () => {
	let valid = false;
	const email = emailEl.value.trim();
	if (!isRequired(email)) {
		showError(emailEl, "Email field cannot be left blank");
	} else if (!isEmailValid(email)) {
		showError(emailEl, "Email is not valid");
	} else {
		showSuccess(emailEl);
		valid = true;
	}
	return valid;
};
const checkTelephone = () => {
	let valid = false;
	const telephone = telephoneEl.value.trim();
	if (!isRequired(telephone)) {
		showError(telephoneEl, "Telephone field cannot be left blank");
	} else if (!isTelephoneValid(telephone)) {
		showError(telephoneEl, "Number is not valid");
	} else {
		showSuccess(telephoneEl);
		valid = true;
	}
	return valid;
};

const isFirstNameValid = (firstName) => {
	const re = /^[a-zA-Z]+$/;
	return re.test(firstName);
};

const isLastNameValid = (lastName) => {
	const re = /^[a-zA-Z]+$/;
	return re.test(lastName);
};

const isEmailValid = (email) => {
	const re =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};

const isTelephoneValid = (telephone) => {
	const re = /^[0-9]+$/;
	return re.test(telephone);
};

const isRequired = (value) => (value === "" ? false : true);

const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");

	const error = formField.querySelector("small");
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;

	formField.classList.remove("error");
	formField.classList.add("success");

	const error = formField.querySelector("small");
	error.textContent = "";
};

//final validation for the form
const submitBtn = document.getElementById("submitButton");
let hiddenBox = (document.getElementById("terms").style.visibility = "hidden");
let evalResult = "";

//show or hide the terms and conditions check box

function showBox() {
	document.getElementById("terms").style.visibility = "visible";
	console.log("a wild box appeared!");
}

function hideBox() {
	document.getElementById("terms").style.visibility = "hidden";
	console.log("the box fled!");
}

// validation runs on every input and only shows the checkbox
// when the form is completely vaslidated

let valid = "";

document.querySelector("form").addEventListener("input", function () {
	let valid = false;
	if (
		(checkFirstName(), checkLastName(), checkEmail(), checkTelephone() === true)
	) {
		valid = true;
	} else {
		valid = false;
	}
	console.log(valid);
	if (valid === true) {
		showBox();
	} else {
		hideBox();
	}
});

const cb = document.querySelector("#accept");
console.log("it is" + cb.checked);

cb.addEventListener("click", function () {
	if (cb.checked === true) {
		submitBtn.disabled = false;
	} else {
		submitBtn.disabled = true;
	}
});

// post the data
const wrapper = document.getElementById("wrapper");
const formWrap = document.getElementById("formWrap");
const successMsg = document.getElementById("successMsg");
const applicantH1 = document.getElementById("applicantH1");
successMsg.style.display = "none";

function successTime() {
	successMsg.style.display = "flex";
	applicantH1.style.display = "none";
	successMsg.style.flexDirection = "column";
	formWrap.style.display = "none";
}

//new post function
/*

const submit = document.getElementById("submit");

const getFormData = () => {
	const form = document.getElementById("form");
	return new FormData(form);
};

const toJson = function (event) {
	const formData = getFormData();
	event.preventDefault();
	let object = {};
	formData.forEach((value, key) => {
		if (!Reflect.has(object, key)) {
			object[key] = value;
			return;
		}
		if (!Array.isArray(object[key])) {
			object[key] = [object[key]];
		}
		object[key].push(value);
	});
	let json = JSON.stringify(object);
	console.log(json);
};

submit.addEventListener("click", toJson);

*/

// optional if() to debug
// if (Request.method === "OPTIONS") {
// 	return new Response("OK", { headers: corsHeaders });
// }
// if (Request.method === "POST") {
/*
const corsHeaders = {
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Methods": "POST",
	"Access-Control-Allow-Methods": "OPTIONS",
	"Access-Control-Allow-Origin": "*",
};
const newInput = document.querySelectorAll("#newLead input");
console.log(newInput);
//const form = document.querySelector("#newLead");
// makepost function
async function makePost() {
	//const formData = new FormData(form);
	//const jsonFormData = JSON.stringify(formData);
	//console.log(jsonFormData);
	//console.log(form);
	//console.log(formData);
	try {
		const Response = await fetch(
			"https://api.smartr365.com/api/v1/mortgage/lead/create",
			{
				method: "POST",
				body: formArray,
				mode: "cors",
				//credentials: 'include',
				headers: {
					"content-type": "application/json",
					"x-api-key": "2528e9b2-7250-48fc-9371-4c13cd5991a4",
					"accept": "text/plain",
					// "Access-Control-Allow-Headers": "*",
					"Access-Control-Allow-Methods": "POST",
					// "Access-Control-Allow-Methods": "OPTIONS",
					// "Access-Control-Allow-Origin": "*",
				},
			}
		);
		console.log("status code: ", Response.status);
		if (!Response.ok) {
			console.log(Response);
			throw new Error(`Error! status; ${Response.status}`);
		} else {
			successTime();
		}
		const result = await Response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
}

*/

form.addEventListener("submit", async function (e) {
	e.preventDefault();
	const newInput = document.querySelectorAll(
		"#firstName, #lastName, #telephone, #email, #buyerType  input"
	);
	console.log(newInput);
	const formArray = Array.from(newInput).reduce(
		(acc, input) => ({ ...acc, [input.id]: [input.value] }),
		{}
	);
	//turn this to JSON
	const jsonData = JSON.stringify(formArray);
	console.log(jsonData);

	console.log(formArray);
	try {
		const Response = await fetch(
			"https://api.smartr365.com/api/v1/mortgage/lead/create",
			{
				method: "POST",
				body: jsonData,
				mode: "cors",
				//credentials: 'include',
				headers: {
					"content-type": "application/json",
					"x-api-key": "2528e9b2-7250-48fc-9371-4c13cd5991a4",
					"accept": "text/plain",
					// "Access-Control-Allow-Headers": "*",
					"Access-Control-Allow-Methods": "POST",
					// "Access-Control-Allow-Methods": "OPTIONS",
					// "Access-Control-Allow-Origin": "*",
				},
			}
		);
		console.log("status code: ", Response.status);
		if (!Response.ok) {
			console.log(Response);
			throw new Error(`Error! status; ${Response.status}`);
		} else {
			successTime();
		}
		const result = await Response.json();
		return result;
	} catch (err) {
		console.log(err);
	}
});

// real time validation
function debounce(fn, delay = 500) {
	let timeoutId;

	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
}

//event delegation
form.addEventListener(
	"input",
	debounce(function (e) {
		switch (e.target.id) {
			case "firstName":
				checkFirstName();
				break;
			case "lastName":
				checkLastName();
				break;
			case "email":
				checkEmail();
				break;
			case "telephone":
				checkTelephone();
				break;
		}
	})
);
