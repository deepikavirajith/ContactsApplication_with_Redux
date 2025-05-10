import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactList from './ContactList';
import { Link } from 'react-router-dom';
import { getContacts } from '../reducer/ContactSlice';

const SearchComponent = () => {
    const contacts = useSelector((state) => state.contacts.contacts);
    const dispatch = useDispatch();

    console.log(contacts);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch]);

    const [searchQuery, setSearchQuery] = useState('');

    // Show loading if contacts are not loaded or not an array
    if (!Array.isArray(contacts)) {
        return <div>Loading contacts...</div>;
    }


    // Filter contacts by search
    const filteredContacts = contacts.filter((contact) =>
        contact.pname?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    console.log(filteredContacts);
     console.log('contacts:', contacts);
    console.log('searchQuery:', searchQuery);
    console.log('filteredContacts:', filteredContacts);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

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
                {filteredContacts.length === 0 ? (
                    <div className="col text-center mt-4">No contacts found.</div>
                ) : (
                    filteredContacts.map((contact) => (
                        <div key={contact.id}>
                            {/* Try this for debugging: */}
                            {/* <div>{contact.pname}</div> */}
                            <ContactList contact={contact} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default SearchComponent;
