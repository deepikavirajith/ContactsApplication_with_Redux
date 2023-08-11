import { ActionTypes } from "./ActionTypes";


export const addContacts = (contacts) => {
    return{
        type:ActionTypes.ADD_CONTACTS,
        payload: contacts
    }

}

export const viewContacts = () => {
    return{
        type:ActionTypes.VIEW_CONTACTS,
        payload: ''
    }

}

export const deleteContactAction  = (id) => {
    return {
        type: ActionTypes.DELETE_CONTACTS,
        payload: id,
    };
};

export const editContactAction = (id, updatedData) => {
    return {
        type: ActionTypes.EDIT_CONTACTS,
        payload: {
            id: id,
            updatedData: updatedData
        }
    };
};