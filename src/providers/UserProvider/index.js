import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { mapErrors } from './helper';

const loginUrl = 'http://localhost:8080/login';
const createUrl = 'http://localhost:8080/users/create';
const editUrl = 'http://localhost:8080/users/edit/';
const usersUrl = 'http://localhost:8080/users/'
const UserContext = React.createContext();
const loginFormInitialState = {
    username: '',
    password: ''
};
const createFormInitialState = {
    name: '',
    username: '',
    password: '',
    age: '',
    phone: '',     
    email: ''
}
const pullTheId = (path) => {
    const splittedPath = path.split('/');
    return splittedPath.length === 4 ? splittedPath[splittedPath.length - 1] : null;
}

const Provider = ({
    history,
    children
}) => {
    const { pathname } = history.location;
    const userId = pullTheId(pathname);
    const initialState = pathname === '/login' ? loginFormInitialState : createFormInitialState;

    const [formValue, setFormValue] = useState(initialState)
    const [error, setError] = useState(null);
    const [validationErrors, setValidationError] = useState([]);

    const resetErrors = () => {
        setError(null);
        setValidationError([]);
    }
    const resetFormData = () => setFormValue(initialState);

    useEffect(() => {
        const fetchEditUser = async () => {
            const { data } = await axios.get(`${usersUrl}${userId}`);
            const { id, ...user } = data;
            setFormValue(user);
        }
        if (userId && userId !== 'details') {
            fetchEditUser();
        }
        return () => {
            resetFormData();
        }
    }, [userId]);

    useEffect(() => {
        return () => {
            resetFormData();
            resetErrors();
        };
    }, [pathname])

    const createSubmit = action => (event, validateFields) => {
        event.preventDefault();
        validateFields((err, values) => {
            console.log(err)
            if (err) {
                setValidationError(mapErrors(err));
                return;
            }
            action(values);
        })
    }
    const loginUser = async formValues => {
        try {
            const { data } = await axios.post(loginUrl ,formValues);
            localStorage.setItem('userData', JSON.stringify(data));
            resetFormData()
            history.push('/users');
        } catch (err) {
            setError(err);
            resetFormData();
        }
    }
    const createUser = async formValues => {
        try {
            const { data } = await axios.post(createUrl, formValues);
            localStorage.setItem('userData', JSON.stringify(data));
            resetFormData()
            history.push('/users');
        } catch (err) {
            setError(err);
            resetFormData();
        }
    }
    const editUser = async formValues => {
        try {
            await axios.post(`${editUrl}${userId}`, formValues);
            history.push('/users')
        } catch (err) {
            setError(err);
            resetFormData();
        }
    }
    const submitLogin = createSubmit(loginUser);
    const submitCreate = createSubmit(createUser);
    const submitEdit = createSubmit(editUser);

    const onChange = (value) => {
        setFormValue({ ...formValue, ...value });
    }

    const value = {
        error,
        submitLogin,
        submitCreate,
        submitEdit,
        onChange,
        validationErrors,
        resetErrors,
        formValue
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};

export const UserProvider = withRouter(Provider);

export const useUserState = () => useContext(UserContext);