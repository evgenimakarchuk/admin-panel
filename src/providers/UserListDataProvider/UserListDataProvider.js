import React from 'react';
import axios from 'axios';

const UserListDataContext = React.createContext();

export const UserListDataProvider = ({
    initialState = {
        data: {
            items: [],
            total: 1000,
        },
        params: {
            offset: 0,
            limit: 10,
            sorting: null,
            filters: [],
        },
    },
    children,
}) => {
    /**
     * User data state
     * data: {
     *   item: User[],
     *   total: number
     * }
     * setData: (data) => data
     */
    const [data, setData] = React.useState(initialState.data);
    const [params, setParams] = React.useState(initialState.params);

    const cleanUp = () => {
        setData(initialState.data);
        setParams(initialState.params);
    };
    const loadData = newParams => setParams({ ...params, ...newParams });
    
    /**
     * Effect for loading user data
     * Depends on: nothing
     */
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(
                    'http://localhost:8080/users',
                    { params },
                );

                setData(data);
            } catch (e) {
                console.log(e);
                cleanUp();
            }
        }

        fetchData();
    }, [params.offset]);
    // const[]
    
    const value = {
        data,
        params,
        loadData
    };
    // setParams()
    return (
        <UserListDataContext.Provider value={value}>
            {children}
        </UserListDataContext.Provider>
    );
};

export const useUserListDataState = () => React.useContext(UserListDataContext);
