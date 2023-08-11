import { combineReducers } from "redux";
import { contactReducer } from "./ContactReducer";

const reducer = combineReducers({
    contacts: contactReducer
});
export default reducer;