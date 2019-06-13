import React from 'react';
import UserDetailsComponent from '../../components/UserDetailsComponent';
import { withRouter } from 'react-router-dom';

import './styles.css';

export default () => {
    const LogoutComponentWithRouter = withRouter(UserDetailsComponent);
    return <LogoutComponentWithRouter/>
};