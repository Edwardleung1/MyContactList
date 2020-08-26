// Contact Class: Represents a Contact
class Contact {
  constructor(firstName, lastName, mobileNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mobileNumber = mobileNumber;
  }
}

// UI Class: Handles UI Tasks
// Create a static method for the UI Class
class UI {
  static displayContacts() {
    const StoredContacts = [
      {
        firstName: "Edward",
        lastName: "Leung",
        mobileNumber: "07700900796",
      },
      {
        firstName: "Nathan",
        lastName: "Lee",
        mobileNumber: "07755932781",
      },
    ];

    const contacts = StoredContacts;

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
}

// Store Class: Handles Storage

// Event: Display Contacts
// As soon as DOM loads, call the UI.displayContacts()
document.addEventListener("DOMContentLoaded", UI.displayContacts);

// Event: Add a Contact

// Event: Remove a Contact
