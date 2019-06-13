import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

export default ({ history }) => {
    const [ user, setUser ] = useState(null);
    const { pathname } = history.location;
    
    const logoutUser = () => {
        localStorage.removeItem('userData');
        localStorage.removeItem('currentTab');
        history.push('/login');
        setUser(null);
    }

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData && pathname !== '/users/create') {
            history.push('/login')
            return;
        }
        if (!user && userData) {
            const { username } = userData.user;
            setUser(username);
        }
    }, [user, pathname])

    return <div className='user-container'>
        {user && <div className='logout-wrap'>
                <span className='title'>hello { user }!</span>
                <Button type="primary" onClick={logoutUser}>logout</Button>
            </div>}
        </div>
}
