// Gettting the checkbox element
const checkbox = document.getElementById('checkbox');

// Getting the tables section
const tablesSection = document.querySelector('.tablesSection');

// Array for storing inventory items
const inventoryItems = [];

// getting the edit btn element
const edit = document.getElementById('editbutton');

// getting submit button element in edit forms
const submitedit = document.getElementById('SubmitEdit');

// Function for checking if an item exists already
function checkIfExists(item, inventoryItems) {
	for (var i = 0; i < inventoryItems.length; i++) {
		if(item == inventoryItems[i]) {
			return true;
		}
	}
}


// Function for adding new item in the inventory
inputForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Getting the item from the input field
	const item = document.getElementById('item').value;

	// Getting the quantity from the input field
	const quantity = document.getElementById('quantity').value;

	// We can't let an input field be empty
	if(item.length == 0 || quantity.length == 0) {
		alert("Fill out the form first");
	}

	// If all input fields are not empty, go here
	else {

		// Check if item already exists
		if (checkIfExists(item, inventoryItems)) {
			alert('Item already taken');
		}

		// If it doesn't exist yet, go here
		else {

			// push to the inventoryItems list
			inventoryItems.push(item);
			console.log(inventoryItems)

			// create the table row element for storing items
			const trElement = document.createElement('tr');

			// create table data for storing item name
			const tdElementForItemName = document.createElement('td');

			// create table data for storing quantity 
			const tdElementForQty = document.createElement('td');

			// setting the text content of the item name and quantity
			tdElementForItemName.textContent = item;
			tdElementForQty.textContent = quantity;

			// adding to the table data element to the table row
			trElement.appendChild(tdElementForItemName);
			trElement.appendChild(tdElementForQty);

			// adding table row element to the table
			document.querySelector('table').appendChild(trElement);
		}

	}

})

checkbox.addEventListener('change', function(e) {
	e.preventDefault();
    
	if(checkbox.checked == true) {
		tablesSection.style.display = "block";
	}
	else {
		tablesSection.style.display = "none";
	}

})
var editform = document.getElementById('editForm');
edit.addEventListener('click', function(e){
    
    if (editform.style.display == 'block') {
        editform.style.display = 'none';
    } else{
        editform.style.display = 'block';
    }
})

submitedit.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const newItem = document.getElementById('NewItemName').value;
    const newQty = document.getElementById('NewQty').value;

    if (newItem.length === 0 || newQty.length === 0) {
        alert("Fill out the form first");
        return; // Exit the function early if the form is not filled out
    }

    const itemNameCells = document.querySelectorAll('table tr td:first-child');

    for (let i = 0; i < itemNameCells.length; i++){
        const itemName = itemNameCells[i].textContent.trim();

        if (itemName === newItem){
            const qtycell = itemNameCells[i].nextElementSibling;

            if(newQty !== null){
                qtycell.textContent = newQty;
                alert('Updated Successfully');
                return;
            }
        }
    }
    
});


// LOGIN REG APP.JS

// For the title
const title = document.querySelector('#title');
// For reg form
const regForm = document.querySelector('.regForm');

// For reg form fields
const usernameReg = document.getElementById('usernameReg');
const passwordReg = document.getElementById('passwordReg');

// For login form
const logForm = document.querySelector('.logForm');

// For login form fields
const username = document.getElementById('username');
const password = document.getElementById('password');

// For username and passwords
const usernameAndPasswords = {}

// For getting the date and time today
const time = new Date().toLocaleString();

// For checking if a username already exists
function checkIfUserExists(username, usernameAndPasswords) {
	if (usernameAndPasswords.hasOwnProperty(username)) {
		return true
	}
}

// For validating username and passwords stored 
function validateUserNameAndPassword(username, password, usernameAndPasswords,) {
	if(usernameAndPasswords.hasOwnProperty(username) && usernameAndPasswords[username] == password) {
		return true;
	}
}

regForm.addEventListener('submit', function (e) {
	e.preventDefault();

	// Validate if one of the fields are empty
	if(usernameReg.value.length == 0 || passwordReg.value.length == 0) {
		alert("Fill out all the forms first");
	}

    if (passwordReg.value.length <= 7){
        alert('Insufficient Password Length')
        return
    }
    if (!/^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/.test(passwordReg.value)) {
        alert('Invalid Password. Password must contain only integers and symbols.');
        return;
    }


	// Store username and password to JS object
	else {
		if (checkIfUserExists(usernameReg.value, usernameAndPasswords)) {
			alert('Username is already taken');
		}
		else {

			// Store the username and passwords inside the JavaScript Object 
			usernameAndPasswords[usernameReg.value] = passwordReg.value;
			console.log(usernameAndPasswords);

			// Display the login form and get rid of the registration form on the page
			logForm.style.display = "block";
			regForm.style.display = "none";

		}
	}

   



})

logForm.addEventListener('submit', function (e) {

	// Passing username and password to the function
	if (validateUserNameAndPassword(username.value, password.value, usernameAndPasswords)) {

		// Hide the login form and title after user has been validated
		logForm.style.display = "none";
		title.style.display = "none";

		// Greet user who just logged in
		document.querySelector('.welcomePanel #greeting').innerHTML = "Good day! " + username.value + ". It's currently " + time;
	}
	else {

		// Login invalid
		alert("Username and password don't exist");

	}

})