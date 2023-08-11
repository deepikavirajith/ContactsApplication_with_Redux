import { ActionTypes } from "../actions/ActionTypes";


const initialstate = {
    contacts: null
}

export const contactReducer = (state = initialstate, action) => {
    switch (action && action.type) {
        case ActionTypes.ADD_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            };

        case ActionTypes.DELETE_CONTACTS:
            return {
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload),
            };

        case ActionTypes.VIEW_CONTACTS:
            return {
                ...state,
                contacts: null
            };

        case ActionTypes.EDIT_CONTACTS:
            return {
                ...state,
                contacts: state.contacts.map(contact => {
                    if (contact.id === action.payload.id) {
                        return {
                            ...contact,
                            ...action.payload.updatedData
                        };
                    }
                    return contact;
                })
            };
        default:
            return state;
    }


}