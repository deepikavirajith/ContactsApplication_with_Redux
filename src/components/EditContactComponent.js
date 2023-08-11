import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { editContactAction } from '../actions/ContactsAction';

const EditContactComponent = () => {
    const { id } = useParams();
    const contacts = useSelector((state) => state.contacts.contacts);
    const navigate = useNavigate();
    console.log(contacts);

    const dispatch = useDispatch();

    const [editcontactstate, seteditcontactstate] = useState({
        pname: '',
        pemail: '',
        pnumber: '',
        islogged: false
    })

    useEffect(() => {
        // Fetch the contact details using the provided id
        axios.get(`http://localhost:3001/data/${id}`)
            .then(response => {
                const contactData = response.data;
                seteditcontactstate({
                    pname: contactData.pname,
                    pemail: contactData.pemail,
                    pnumber: contactData.pnumber,
                    islogged: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const editData = async (e) => {
        e.preventDefault();
        const response = await axios.put(`http://localhost:3001/data/${id}`, {
            pname: editcontactstate.pname,
            pemail: editcontactstate.pemail,
            pnumber: editcontactstate.pnumber
        });
        console.log(response);
        if (!editcontactstate.pname || !editcontactstate.pemail || !editcontactstate.pnumber) {
            return toast.warning('Please fill all the fields');
        } else {
            dispatch(editContactAction(id, editcontactstate));
            toast.success('Contact updated', {
                autoClose: 1000
            });
            seteditcontactstate({
                pname: '',
                pemail: '',
                pnumber: '',
                islogged: true
            });
            navigate('/');
        }
       
    }

    const handleOnchange = (e) => {
        e.preventDefault();
        seteditcontactstate({
            ...editcontactstate,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-sm-8 mx-auto'>
                    <form onSubmit={editData}>
                        <div className='form-group mb-3'>
                            <input
                                className='form-control'
                                type='text'
                                name='pname'
                                value={editcontactstate.pname}
                                onChange={handleOnchange}
                                required='true'
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                className='form-control'
                                type='text'
                                name='pemail'
                                value={editcontactstate.pemail}
                                onChange={handleOnchange}
                                required='true'
                            />
                        </div>
                        <div className='form-group mb-3'>
                            <input
                                className='form-control'
                                type='text'
                                name='pnumber'
                                value={editcontactstate.pnumber}
                                onChange={handleOnchange}
                                required='true'
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditContactComponent;
