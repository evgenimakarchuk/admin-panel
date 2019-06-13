import React from 'react';
import { Form, Input } from 'antd';
import isError from './isError';

const getFieldRenderer = ({ getFieldDecorator }) =>
    ({ name, options, placeholder, error}) => (
    <Form.Item key={name} { ...error && {
        help: error,
        validateStatus: 'error',
    }}>
        {getFieldDecorator(name, options,)(
        <Input placeholder={placeholder} />
        )}
    </Form.Item>
);

export default ({ form, state, Control, formConfig, handleSubmit }) => {
    const { error, validationErrors } = state;
    const { isFieldsTouched, validateFields } = form;
    const renderField = getFieldRenderer(form);
    const fieldNames = Object.keys(formConfig);
    const fieldNamesWithErrors = fieldNames.reduce((acc, el) => ({ 
        ...acc, [el]: { ...formConfig[el], error: validationErrors[el] }
    }),{});
    const disabled = isError(validationErrors) || isFieldsTouched();

    return <div className='login-container'>
        <span className='error-wrap'>{error && error.message}</span>
        <Form onSubmit={(event) => handleSubmit(event, validateFields)}>
        {fieldNames.map(key => renderField(fieldNamesWithErrors[key]))}
            <Control disabled={ disabled }/>
        </Form>
    </div>
}
