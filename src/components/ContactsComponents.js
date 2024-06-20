import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteContactAction } from '../actions/ContactsAction';
import { toast } from 'react-toastify';
import SearchComponent from './SearchComponent';


const ContactsComponents = () => {
    const contacts = useSelector((state) => state.contacts.contacts);
    console.log(contacts);

    const dispatch = useDispatch();

    const deleteContact = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/data/${id}`);
            dispatch(deleteContactAction(id));
            toast.success('Contact Deleted', {
                autoClose: 1000
            });
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error('An error occurred while deleting the contact');
        }
    }

    if (contacts != null) {
        const renderList = contacts.map(contact =>
            <div className='container'>
                <div className='row m-2'>
                    <Card key={contact.id} className='card'>

                        <CardBody>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <div className="d-flex justify-content-start">
                                        <CardImg variant="top" src="avtar.jpg" id='image' />
                                    </div>
                                </div>
                                <div className='col-md-8'>
                                    <CardTitle className='cardtitle'>{contact.pname}</CardTitle>
                                    <CardSubtitle>{contact.pnumber}</CardSubtitle>
                                    <CardText>{contact.pemail}</CardText>
                                </div>
                                <div className='col-md-2'>
                                    <div className='d-flex justify-content-end'>
                                        <button type="button" className="btn m-4" id='trash' onClick={() => deleteContact(contact.id)}>
                                            <i className="fa fa-trash fa-lg"></i>
                                        </button>
                                        <Link
                                            to={`/edit/${contact.id}`} // Redirect to edit form with contact id as parameter
                                            className="btn m-4" id='edit'>
                                            <i className='fa fa-edit fa-lg'></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );

        return (
            <div className='container'>
                <div className="row mt-4">
                    <div className='col text-center '>
                        <SearchComponent />
                    </div>
                    <div className='col text-center'>
                        <Link to="/main" className='btn btn-dark'>
                            Add Contact
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    {renderList}
                </div>
            </div>

        )

    }


}

export default ContactsComponents;