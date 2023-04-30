const initialState = {
  contacts: [],
};

export const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CONTACT":
      return {
        ...state,
        contacts: action.payload,
      };
    case "CREATE_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case "UPDATE_CONTACT":
      const updatedContacts = state.contacts.map(contact =>
        contact._id === action.payload.id ? { ...contact, ...action.payload.updatedData } : contact
      );
      return {
        ...state,
        contacts: updatedContacts,
      };
    case "DELETE_CONTACT":
      return {
        ...state, contacts: state.contacts.filter(el => el._id !== action.payload)
      }
    default:
      return state;
  }
};


