import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { editContacts } from '../reducer/ContactSlice';

const EditContactComponent = () => {
    const { id } = useParams();
    const contacts = useSelector((state) => state.contacts.contacts);
    const contact = contacts.find(c => c.id === parseInt(id));
    const navigate = useNavigate();
    console.log(contacts);

    const dispatch = useDispatch();

    const [editcontactstate, seteditcontactstate] = useState(contact || {});

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (contact) {
            seteditcontactstate(contact);
            setIsLoading(false);
        }

    }, [contact]);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(editContacts(editcontactstate));
        toast.success('Contact Updated');
        navigate('/');
    };

    if (!contact) return <div>Loading...</div>;

    return (
        <div className='container'>
            <h1 className="display-4 my-4 text-center">Edit Contact</h1>
            <div className='row'>
                <div className='col-sm-8 mx-auto'>
                    {isLoading ? (
                        <p className='loading'>Loading...</p>
                    ) :
                        <form onSubmit={handleSubmit}>
                            <div className='form-group mb-3'>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='pname'
                                    value={editcontactstate.pname}
                                    onChange={e => seteditcontactstate({ ...editcontactstate, pname: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='pemail'
                                    value={editcontactstate.pemail}
                                    onChange={e => seteditcontactstate({ ...editcontactstate, pemail: e.target.value })}
                                    required
                                />
                            </div>
                            <div className='form-group mb-3'>
                                <input
                                    className='form-control'
                                    type='text'
                                    name='pnumber'
                                    value={editcontactstate.pnumber}
                                    onChange={e => seteditcontactstate({ ...editcontactstate, pnumber: e.target.value })}
                                    required
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
