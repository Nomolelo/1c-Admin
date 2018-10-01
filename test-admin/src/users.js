// in src/users.js
import React from 'react';
import { BooleanField, DateField, List, Datagrid, EmailField, TextField, ImageField } from 'react-admin';

// { picture: { url: 'cover.jpg', title: 'Larry Cover (French pun intended)' } }

export const UserList = (props) => (
    <List title="Users" {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="username" />
            <DateField source="last_login" />
            <BooleanField source="is_superuser" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <EmailField source="email" />
            <DateField source="date_joined" />
            <BooleanField source="is_active" />
            <BooleanField source="is_staff" />
        </Datagrid>
    </List>
);
