import React from 'react';
import UserList from '../../components/UserList/UserList';
import { UserListDataProvider } from '../../providers/UserListDataProvider/UserListDataProvider';
// import { UserDataProvider } from '../../providers/UserDataProvider/UserDataProvider';


export default () => (
    <UserListDataProvider>
        <UserList />
    </UserListDataProvider>
);