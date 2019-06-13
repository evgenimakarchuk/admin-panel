const requiredRule = { required: true, message: 'Field is required!' };
const emailRule = { type: 'email', message: 'The input is not valid E-mail!' };

export const loginFormConfig = {
    username: {
      name: 'username',
      options: { rules: [requiredRule, { max: 20, message: 'too long' }] },
      placeholder: 'Username',
    },
    password: {
      name: 'password',
      options: { rules: [requiredRule] },
      placeholder: 'Password',
    }
};

export const createFormConfig = {
    name: {
      name: 'name',
      options: { rules: [requiredRule] },
      placeholder: 'Name',
    },
    username: {
      name: 'username',
      options: { rules: [requiredRule, { max: 10, message: 'too long' }] },
      placeholder: 'Username',
    },
    age: {
      name: 'age',
      options: { rules: [requiredRule] },
      placeholder: 'Age',
    },
    phone: {
      name: 'phone',
      options: { rules: [requiredRule] },
      placeholder: 'Phone',
    }, 
    email: {
      name: 'email',
      options: { rules: [requiredRule, emailRule] },
      placeholder: 'Email',
    },
    password: {
      name: 'password',
      options: { rules: [requiredRule] },
      placeholder: 'Password',
    }
  };