import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addContacts } from "../actions/ContactsAction";
import SearchComponent from "./SearchComponent";


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
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className="container">
      <div className="row">
        <SearchComponent />
      </div>
    </div>
  );
};

export default NaviComponent;