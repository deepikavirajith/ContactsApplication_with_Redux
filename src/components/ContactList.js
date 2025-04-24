import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardImg } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteContacts } from '../reducer/ContactSlice';


const ContactList = ({ contact }) => {
    const dispatch = useDispatch();




    const handleDelete = (id) => {
        dispatch(deleteContacts(id));
        toast.success('Deleted');
    };


    return (
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
                                    <button type="button" className="btn m-4" id='trash' onClick={() => handleDelete(contact.id)}>
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
}

export default ContactList;