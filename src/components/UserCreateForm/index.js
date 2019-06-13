import { Form as AntdForm } from 'antd';
import Form from '../../components/Form';
import isError from '../Form/isError';

export default AntdForm.create({
    name: 'create_form',
    onFieldsChange: ({ state: { onChange, validationErrors, resetErrors, error } }, fields) => {
        if (isError(validationErrors) || error) {
            resetErrors();
        }
        const field = Object.values(fields)[0];
        const { value, name } = field;
        onChange({ [name]: value });
    },
    mapPropsToFields: ({ state: { formValue: { username, name, password, age, phone, email } } }) => ({
        name: AntdForm.createFormField({ value: name }),
        username: AntdForm.createFormField({ value: username }),
        password: AntdForm.createFormField({ value: password }),
        age: AntdForm.createFormField({ value: age }),
        phone: AntdForm.createFormField({ value: phone }),    
        email: AntdForm.createFormField({ value: email })
    })
 })(Form);