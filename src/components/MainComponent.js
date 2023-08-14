import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';




export const baseUrl = "http://localhost:3001/data";


const MainComponent = () => {

    const [state, setState] = useState({
        contacts: {
            pname: '',
            pemail: '',
            pnumber: '',
            islogged: false
        }
    });


    const navigate = useNavigate();

    const createData = async (e) => {
        e.preventDefault();
        const response = await axios.post(baseUrl, {
            pname: state.contacts.pname,
            pemail: state.contacts.pemail,
            pnumber: state.contacts.pnumber
        });
        console.log(response);
        if (!state.contacts.pname || !state.contacts.pemail || !state.contacts.pnumber) {
            return toast.warning('Please fill all the fields');
        }

        else {
            toast.success('contact added', {
                autoClose: 1000
            });
            setState({
                contacts: {
                    pname: '',
                    pemail: '',
                    pnumber: '',
                    islogged: true
                }
            });
            navigate('/');
        }


    }


    const handleOnchange = (e) => {
        e.preventDefault();
        setState({
            contacts: {
                ...state.contacts,
                [e.target.name]: e.target.value
            }
        });
    }


    return (
        <div className="container">
            <h1 className="display-4 my-4 text-center">Add Contact</h1>
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={createData}>
                        <div className="form-group">
                            <input className="form-control" type='text' placeholder='Enter Name' name='pname'
                                value={state.contacts.pname} onChange={handleOnchange} required={true}></input>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type='email' placeholder='Enter Email' name='pemail'
                                value={state.contacts.pemail} onChange={handleOnchange} required={true}></input>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type='mobile' placeholder='Enter Number' name='pnumber'
                                value={state.contacts.pnumber} onChange={handleOnchange} required={true}></input>
                        </div>
                        <button type="submit" className="btn btn-dark btn-block">
                            Add Contact
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );


}
export default MainComponent;