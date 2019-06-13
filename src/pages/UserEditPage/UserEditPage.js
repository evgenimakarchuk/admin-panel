import React from 'react';
import CreateForm from '../../components/UserCreateForm';
import { createFormConfig } from '../../components/Form/configHelper';
import { EditControl } from '../../components/Controls';
import { useUserState } from '../../providers/UserProvider';

export default () => {
    const EditContainer = () => {
        const state = useUserState();
        const { submitEdit } = state;
        return <CreateForm 
            state={{...state}} 
            formConfig={ createFormConfig } 
            Control={ EditControl }
            handleSubmit= { submitEdit }
        />
    }
    return <EditContainer/>
};