import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const LoginControl = ({ disabled }) => <div className='controls-wrap'>
    <Button 
        type="primary" 
        htmlType="submit" 
        className="login-form-button"
        disabled={disabled}
    >
    Log in
    </Button>
    <span className='label'>Or</span>
    <Link to='/users/create'>register now!</Link>
</div>

export const CreateControl = ({ disabled }) => <div className='controls-wrap'>
    <Button 
        type="primary" 
        htmlType="submit" 
        className="login-form-button"
        disabled={disabled}
    >
    Create
    </Button>
</div>

export const EditControl = ({ disabled }) => <div className='controls-wrap'>
    <Button 
        type="primary" 
        htmlType="submit" 
        className="login-form-button"
        disabled={disabled}
    >
    Save
    </Button>
</div>