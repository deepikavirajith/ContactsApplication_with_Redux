import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactList from './ContactList';
import { Link } from 'react-router-dom';
import { getContacts } from '../reducer/ContactSlice';

const SearchComponent = () => {
    const contacts = useSelector((state) => state.contacts.contacts);
    console.log(contacts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const [searchQuery, setSearchQuery] = useState('');
    // Handle the case when contacts is null or not yet fetched
    if (contacts === null) {
        return <div>Loading contacts...</div>;
    }

    console.log(contacts);
    const searchbtn = contacts.filter((contact) => {
        return contact.pname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    if (contacts === null) {
        return <div>Loading contacts...</div>;
    }


    return (
        <div className='container'>
            <div className="row mt-4">
                <div className='col text-center'>
                    <form>
                        <input
                            type='text'
                            placeholder='Search contacts...'
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </form>
                </div>
                <div className='col text-center'>
                    <Link to="/main" className='btn btn-dark'>
                        Add Contact
                    </Link>
                </div>
            </div>
            <div className='row'>
                {searchbtn.map((contact) => (
                    <div key={contact.id}>
                        <ContactList contact={contact} />
                    </div>
                ))}
            </div>
        </div>


    );
}

export default SearchComponent;
