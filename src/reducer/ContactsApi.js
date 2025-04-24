
import axios from 'axios';


export const baseUrl = "http://localhost:3001/data";

export const getContacts = async () => (await axios.get(baseUrl)).data;
export const addContacts = async (contact) => (await axios.post(baseUrl, contact)).data;
export const deleteContacts = async (id) => {
    await axios.delete(`${baseUrl}/${id}`);
    return id;
};

export const editContacts = async (contact) =>
    (await axios.put(`${baseUrl}/${contact.id}`, contact)).data