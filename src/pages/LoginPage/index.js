import React from 'react';
import LoginForm from '../../components/LoginForm';
import { loginFormConfig } from '../../components/Form/configHelper';
import { LoginControl } from '../../components/Controls';
import { useUserState } from '../../providers/UserProvider';

import './styles.css';

export default () => {
    const LoginContainer = () => {
        const state = useUserState();
        const { submitLogin } = state;
        return <LoginForm 
            state={{...state}} 
            formConfig={ loginFormConfig } 
            Control={ LoginControl }
            handleSubmit={ submitLogin }
        />
    }
    return <LoginContainer/>
};