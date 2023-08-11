import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addContacts } from "../actions/ContactsAction";
import ContactsComponents from "./ContactsComponents";


const NaviComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/data")
      .then((response) => {

        dispatch(addContacts(response.data));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }, []);

  
  return (
    <div className="container">
      <div className="row">
        <ContactsComponents />
      </div>
    </div>
  );
};

export default NaviComponent;