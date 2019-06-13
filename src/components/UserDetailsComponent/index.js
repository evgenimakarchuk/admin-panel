import React, { useEffect, useState } from 'react';
import axios from 'axios';

const usersUrl = 'http://localhost:8080/users/';
const pullTheId = (path) => {
    const splittedPath = path.split('/');
    return splittedPath.length === 4 ? splittedPath[splittedPath.length - 2] : null;
}
const renderDetails = (userData) => Object
    .keys(userData)
    .filter(field => field !== 'id')
    .map((field, i) => {
        return userData[field] instanceof Object ? 
        renderDetails(userData[field]) :
        <span className='details-field' key={i}>{`${field}: ${userData[field]}`}</span>
    })

export default ({ history }) => {
    const [ userData, setUserData ] = useState({});
    const { pathname } = history.location;
    const userId = pullTheId(pathname);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await axios.get(`${usersUrl}${userId}`);
                setUserData(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchDetails();
    }, [userId]);

    return <div className='user-container'>
        {userData && <div className='logout-wrap'>
                {renderDetails(userData)}
            </div>}
        </div>
}
