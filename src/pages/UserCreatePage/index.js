import React from 'react';
import CreateForm from '../../components/UserCreateForm';
import { createFormConfig } from '../../components/Form/configHelper';
import { CreateControl } from '../../components/Controls';
import { useUserState } from '../../providers/UserProvider';

export default () => {
    const CreateContainer = () => {
        const state = useUserState();
        const { submitCreate } = state;
        return <CreateForm 
            state={{...state}} 
            formConfig={ createFormConfig } 
            Control={ CreateControl }
            handleSubmit={ submitCreate }
        />
    }
    return <CreateContainer/>
};