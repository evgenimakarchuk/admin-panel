import React from 'react';
import { Form, Input, Button } from 'antd';

// const getFieldRenderer = ({ getFieldDecorator }) =>
//   ({ name, options, placeholder }) => (
//     <Form.Item key={name}>
//       {getFieldDecorator(name, options,)(
//         <Input placeholder={placeholder} />
//       )}
//     </Form.Item>
//   );

// const UserForm = ({
//   form,
//   handleSubmit = async (e) => {
//     e.preventDefault();
//     const values = await form.validateFields();
//     console.log(values);
      
//   },
// }) => {
//   const renderField = getFieldRenderer(form);
//   const fieldNames = Object.keys(formConfig);

//   return (
//     <Form onSubmit={handleSubmit}>
//       {fieldNames.map(key => renderField(formConfig[key]))}
//       <Button
//         type='primary'
//         htmlType='submit'
//       >
//           Submit
//       </Button>
//     </Form>
//   );
// };

const withForm = Form.create({
  name: 'user_edit',
  mapPropsToFields: ({
    value = {
      name: '',
      username: '',
      age: '',
      phone: '',     
      email: ''
    },
  }) => ({
    name: Form.createFormField({ value: value.name }),
    username: Form.createFormField({ value: value.username }),
    age: Form.createFormField({ value: value.age }),
    phone: Form.createFormField({ value: value.phone }),    
    email: Form.createFormField({ value: value.email })    
  }),
});

// export default withForm(
//   UserForm
// );
