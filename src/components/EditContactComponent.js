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
    });

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

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
                setIsLoading(false);
                setIsSaving(false);
            })
            .catch(error => {
                console.log(error);
                setIsLoading(false);

            });
    }, [id]);

    const editData = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const response = await axios.put(`http://localhost:3001/data/${id}`, {
                pname: editcontactstate.pname,
                pemail: editcontactstate.pemail,
                pnumber: editcontactstate.pnumber
            });
            console.log(response);
            if (!editcontactstate.pname || !editcontactstate.pemail || !editcontactstate.pnumber) {
                return toast.warning('Please fill all the fields');
            } else {
                toast.success('Contact updated', {
                    autoClose: 1000
                });
                dispatch(editContactAction(id, editcontactstate));
                seteditcontactstate({
                    pname: '',
                    pemail: '',
                    pnumber: '',
                    islogged: true
                });
                setIsSaving(false);
                navigate('/');
            }
        }
        catch (error) {
        console.error(error);
        setIsSaving(false);
        toast.error('An error occurred. Please try again.');
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
        <h1 className="display-4 my-4 text-center">Edit Contact</h1>
        <div className='row'>
            <div className='col-sm-8 mx-auto'>
                {isLoading ? (
                    <p className='loading'>Loading...</p>
                ) :
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
                        <button type='submit' className='btn btn-primary' disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </form>
                }
            </div>
        </div>
    </div>
);
}

export default EditContactComponent;
