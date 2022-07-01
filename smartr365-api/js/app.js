const firstNameEl = document.querySelector('#firstName');
const lastNameEl = document.querySelector('#lastName');
const emailEl = document.querySelector('#email');
const telephoneEl = document.querySelector('#telephone');
// const checkBox = document.getElementById("accept");
// const submitBtn = document.getElementById("submitButton");

const form = document.querySelector('#newLead');

const checkFirstName = () => {
    let valid = false;

    const firstName = firstNameEl.value.trim();

    if (!isRequired(firstName)) {
        showError(firstNameEl, 'First name cannot be left blank');
    } else if (!isFirstNameValid(firstName)) {
        showError(firstNameEl, 'First name must only contain letters');
    } else {
        showSuccess(firstNameEl);
        valid = true;
    };
    return valid;
};

const checkLastName = () => {
    let valid = false;

    const lastName = lastNameEl.value.trim();

    if (!isRequired(lastName)) {
        showError(lastNameEl, 'Last name cannot be left blank');
    } else if (!isLastNameValid(lastName)) {

        showError(lastNameEl, 'Last name must only contain letters');

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
        showError(emailEl, 'Email field cannot be left blank');
    } else if (!isEmailValid(email)) {
        showError(emailEl, 'Email is not valid')
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
        showError(telephoneEl, 'Telephone field cannot be left blank');
    } else if (!isTelephoneValid(telephone)) {
        showError(telephoneEl, 'Number is not valid')
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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isTelephoneValid = (telephone) => {
    const re = /^[0-9]+$/;
    return re.test(telephone);
};

const isRequired = value => value === '' ? false : true;


const showError = (input, message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}

//final validation for the form
const submitBtn = document.getElementById("submitButton");
let hiddenBox = document.getElementById("terms").style.visibility = "hidden";
let evalResult = "";

//show or hide the terms and conditions check box

function showBox() {
    document.getElementById("terms").style.visibility = "visible";
    console.log("a wild box appeared!");
};

function hideBox() {
    document.getElementById("terms").style.visibility = "hidden";
    console.log("the box fled!");
};

// validation runs on every input and only shows the checkbox
// when the form is completely vaslidated

let valid = ""

document.querySelector("form").addEventListener("input", function() {
    let valid = false;
    if (checkFirstName(),
        checkLastName(),
        checkEmail(),
        checkTelephone() === true) {
        valid = true;
    } else {
        valid = false;
    };
    console.log(valid);
    if (valid === true) {
        showBox();
    } else {
        hideBox();
    };
});

const cb = document.querySelector("#accept");
console.log("it is" + (cb.checked));

cb.addEventListener('click', function() {
    if (cb.checked === true) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
});

// post the data
const wrapper = document.getElementById('wrapper');
const formWrap = document.getElementById('formWrap');
const successMsg = document.getElementById('successMsg');
const applicantH1 = document.getElementById('applicantH1');
successMsg.style.display = 'none';

function successTime() {
    successMsg.style.display = 'flex';
    applicantH1.style.display = 'none';
    successMsg.style.flexDirection = 'column';
    formWrap.style.display = 'none';
}



async function makePost() {
    const formData = new FormData(form);
    try {
        const response = await fetch('create-lead.php', {
            method: 'post',
            body: formData,

        });
        console.log('status code: ', response.status);
        if (!response.ok) {
            console.log(response);
            throw new Error(`Error! status; ${response.status}`);
        } else {
            successTime();
        }
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err);
    }
};

form.addEventListener('submit', function(e) {

    e.preventDefault();
    makePost();

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
form.addEventListener('input', debounce(function(e) {
    switch (e.target.id) {
        case 'firstName':
            checkFirstName();
            break;
        case 'lastName':
            checkLastName();
            break;
        case 'email':
            checkEmail();
            break;
        case 'telephone':
            checkTelephone();
            break;
    }
}));