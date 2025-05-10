import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addContacts } from '../reducer/ContactSlice';




export const baseUrl = "http://localhost:3001/data";


const MainComponent = () => {

    const [state, setState] = useState({
        pname: '',
        pemail: '',
        pnumber: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!state.pname || !state.pemail || !state.pnumber) {
            toast.warning('Please fill all fields');
            return;
        }
        await dispatch(addContacts(state));
        toast.success('Contact Added');
        setState({ pname: '', pemail: '', pnumber: '' });
        navigate('/');
    };



    return (
        <div className="container">
            <h1 className="display-4 my-4 text-center">Add Contact</h1>
            <div className="row">
                <div className="col-sm-6 offset-sm-3">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input className="form-control" type='text' placeholder='Enter Name' name='pname'
                                value={state.pname} onChange={e => setState({ ...state, pname: e.target.value })} required={true}></input>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type='email' placeholder='Enter Email' name='pemail'
                                value={state.pemail} onChange={e => setState({ ...state, pemail: e.target.value })} required={true}></input>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type='mobile' placeholder='Enter Number' name='pnumber'
                                value={state.pnumber} onChange={e => setState({ ...state, pnumber: e.target.value })} required={true}></input>
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