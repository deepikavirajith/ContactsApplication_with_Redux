import React from 'react';
import { useSelector } from 'react-redux';

const SearchComponent= () => {
    const contacts = useSelector((state) => state.contacts.contacts);
    console.log(contacts);
  return (
    <div className='container'>
        <div className='row'>
            <form>
                <div>
                    <input type='text'></input>
                </div>
            </form>

        </div>
    </div>
  )
}

export default SearchComponent;
