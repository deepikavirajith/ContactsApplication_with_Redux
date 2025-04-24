import React from 'react';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './ContactsApi';

export const getContacts = createAsyncThunk('contacts/getContacts', api.getContacts);
export const addContacts = createAsyncThunk('contacts/addContacts', api.addContacts);
export const deleteContacts = createAsyncThunk('contacts/deleteContacts', api.deleteContacts);
export const editContacts = createAsyncThunk('contacts/editContacts', api.editContacts);

const ContactSlice = createSlice({
    name: 'contacts',
    initialState: { contacts: [], status: 'Idil', error: null },
    reducer: {},
    extraReducers: (builder) => {
        builder
            .addCase(getContacts.fulfilled, (state, action) => {
                state.contacts = action.payload;

            })
            .addCase(addContacts.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })
            .addCase(deleteContacts.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
            })
            .addCase(editContacts.fulfilled, (state, action) => {
                const idx = state.contacts.findIndex(contact => contact.id === action.payload.id)
                state.contacts[idx] = action.payload;
            })
    }

});
export default ContactSlice.reducer;
