import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, CardFooter } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { deleteContactAction } from '../actions/ContactsAction';
import { toast } from 'react-toastify';
import EditContactComponent from './EditContactComponent';


const ContactsComponents = () => {
    const contacts = useSelector((state) => state.contacts.contacts);
    console.log(contacts);

    const dispatch = useDispatch();

    const deleteContact = (id) => {
        axios.delete(`http://localhost:3001/data/${id}`)
            .then(res => {
                // Update Redux store after successful delete
                dispatch(deleteContactAction(id));
                console.log('Item deleted successfully');
                toast.success('Contact Deleted', {
                    autoClose: 1000
                });
            })
            .catch(error => {
                // Handle error
                if (error.response) {
                    // The request was made, but the server responded with a status code that falls out of the range of 2xx
                    console.log('Server returned an error:', error.response.data);
                    console.log('Status code:', error.response.status);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.log('No response received:', error.request);
                } else {
                    // Something else happened that caused an error
                    console.log('Error:', error.message);
                }
            });

    }

    if (contacts != null) {
        const renderList = contacts.map(contact =>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <Card key={contact.id} >
                            <CardBody>
                                <CardTitle className='cardtitle'>{contact.pname}</CardTitle>
                                <CardSubtitle>{contact.pnumber}</CardSubtitle>
                                <CardText>{contact.pemail}</CardText>
                            </CardBody>
                            <CardFooter>
                                <button type="button" className="btn btn-danger mx-5" onClick={() => deleteContact(contact.id)}>
                                    <i className="fa fa-trash fa-lg"></i></button>
                                <Link
                                    to={`/edit/${contact.id}`} // Redirect to edit form with contact id as parameter
                                    className="btn btn-info mx-5">
                                    <i className='fa fa-edit fa-lg'></i>
                                </Link>


                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        );





        return (
            <div className='container'>
                <div className="row display-block m-5">
                    <Link to="/main" type='submit' className='btn btn-dark'>Add Contact</Link>
                </div>
                <div className='row'>
                    {renderList}
                </div>
            </div>

        )

    }


}

export default ContactsComponents;