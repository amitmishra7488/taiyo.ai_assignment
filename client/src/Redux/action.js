import axios from "axios";

// GET
export const fetchContactData = (Contact) => {
  return {
    type: "FETCH_CONTACT",
    payload: Contact,
  };
};

// Create action
export const createContact = (Contact) => {
  return {
    type: "CREATE_CONTACT",
    payload: Contact,
  };
};

// Delete action
export const deleteContact = (contactId) => {
  return {
    type: "DELETE_CONTACT",
    payload: contactId,
  };
};




// Update

export const updateContact = (id, updatedData) => {
  console.log("updateContact: id=", id, "updatedData=", updatedData);
  return {
    type: "UPDATE_CONTACT",
    payload: { id, updatedData },
  }

};









