import React from 'react';
import LogoutComponent from '../../components/LogoutComponent';
import { withRouter } from 'react-router-dom';

import './styles.css';

export default () => {
    const LogoutComponentWithRouter = withRouter(LogoutComponent);
    return <LogoutComponentWithRouter/>
};