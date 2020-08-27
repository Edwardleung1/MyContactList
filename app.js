// 1. Contact Class: Represents a Contact
class Contact {
  constructor(firstName, lastName, mobileNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNumber = mobileNumber;
  }
}

// 2. UI Class: Handles UI Tasks
// Create a static method for the UI Class
class UI {
  static displayContacts() {
    // Get contacts from Local storage
    const contacts = Storage.getContacts();

    // Loop through contacts in array
    contacts.forEach(function (contact) {
      // Calling a method and passing the contact into it
      UI.addContactToList(contact);
    });
  }

  // Call function
  // Create a row to put into the table
  static addContactToList(contact) {
    const list = document.querySelector("#contact-list");

    // Creat a DOM element (new row)
    const row = document.createElement("tr");
    // Things inside the row
    row.innerHTML = `
      <td>${contact.firstName}</td>
      <td>${contact.lastName}</td>
      <td>${contact.mobileNumber}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
     `;
    // Append row to the list
    list.appendChild(row);
  }

  // Delete a contact
  static deleteContact(target) {
    // Make sure it has a delete class before we do anything
    if (target.classList.contains("delete")) {
      // Remove the whole element, td to tr
      target.parentElement.parentElement.remove();
    }
  }

  // Show alert on form input fields
  static showAlert(alertMessage, className) {
    // Build div from scratch
    const div = document.createElement("div");
    // Add className to the div
    div.className = `alert alert-${className}`;
    // Add alert message text to the div
    div.appendChild(document.createTextNode(alertMessage));
    // Insert it into the UI using a parent element (container)
    const container = document.querySelector(".container");
    const form = document.querySelector("#contact-form");
    // Insert the div before the form
    container.insertBefore(div, form);
    // Set a timeout to remove the alert after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

// 3. Store Class: Handles Storage
class Storage {
  // Static so we can call them directly without instantiate storage
  // Get contacts
  static getContacts() {
    // Init variable called contacts
    let contacts;
    // Check if local contact item in storage
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      // Stored as a string, so need to parse it into an JS array object
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }

  // Add a contact
  static addContact(contact) {
    // Get contacts from local storage
    const contacts = Storage.getContacts();
    // Push new contact into it
    contacts.push(contact);
    // Reset it to local storage
    // Contacts is an array of objects, stringify coverts it to a JSON string
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  // Remove a contact, using mobile as an unique primary key
  static removeContact(mobileNumber) {
    const contacts = Storage.getContacts();
    // Loop through the contacts
    contacts.forEach((contact, index) => {
      // Check if mobileNumber matches the remove contact
      if (contact.mobileNumber === mobileNumber) {
        // Remove it using splice
        contacts.splice(index, 1);
      }
    });
    // Reset local storage with removed contact
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
}

// 4. Event: Display Contacts
// As soon as DOM loads, call the UI.displayContacts()
document.addEventListener("DOMContentLoaded", UI.displayContacts);

// 5. Event: Add a Contact
// Listen for a submit button on the form
document.querySelector("#contact-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const mobileNumber = document.querySelector("#mobileNumber").value;

  // Validation check on form fields
  if (firstName === "" || lastName === "" || mobileNumber === "") {
    UI.showAlert("Please fill in all the fields", "danger");
  } else if (isNaN(mobileNumber) || mobileNumber.length != 11) {
    UI.showAlert("Please enter a valid UK mobile Number", "danger");
  } else {
    // Instantiate a contact
    const contact = new Contact(firstName, lastName, mobileNumber);

    // Add new Contact to UI (table)
    UI.addContactToList(contact);

    // Add new Contact to local storage
    Storage.addContact(contact);

    // Show success alert message when added new contact
    UI.showAlert("New contact added", "success");

    // Clear contact form fields after submit
    document.getElementById("contact-form").reset();
  }
});

// 6. Event: Remove a Contact
// Event propagation to target the actual contact list
document.querySelector("#contact-list").addEventListener("click", (e) => {
  // Remove contact from UI
  UI.deleteContact(e.target);
  // Remove contact from local storage
  // Need to get to mobileNumber which will be passed onto remove contact
  Storage.removeContact(e.target.parentElement.previousElementSibling.textContent);
  // Show success alert message when deleted a contact
  UI.showAlert("Contact deleted", "success");
});
