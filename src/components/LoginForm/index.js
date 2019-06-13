import { Form as AntdForm } from 'antd';
import Form from '../../components/Form';
import isError from '../Form/isError';

export default AntdForm.create({
    name: 'login_form',
    onFieldsChange: ({ state: { onChange, validationErrors, resetErrors, error } }, { username, password }) => {
        if (isError(validationErrors) || error) {
            resetErrors();
        }
        const field = username || password;
        const { value, name } = field;
        onChange({ [name]: value });
    },
    mapPropsToFields: ({ state: { formValue: { username, password } } }) => ({
        username: AntdForm.createFormField({ value: username }),
        password: AntdForm.createFormField({ value: password })
    })
 })(Form);