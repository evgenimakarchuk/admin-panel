import React from 'react';
import { Table, Icon } from 'antd';
import { Link } from 'react-router-dom';
import './UserList.css';
import { useUserListDataState } from '../../providers/UserListDataProvider/UserListDataProvider';

export default () => {
    const {
        data: { items, total },
        params: {
            offset,
            limit,
        },
        loadData,
    } = useUserListDataState();
      
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        }, {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },{
            title: 'Edit',
            key: 'edit',
            render: ({ id }) => <div>
                <Link to={`users/edit/${id}`}>
                    <Icon type="edit" />
                </Link>
                <Link to={`users/${id}/details`} className='user-details'>
                    <Icon type="read" />
                </Link>
            </div>,
        }
    ];
      
    return ( 
        <Table
            dataSource={items}
            columns={columns}
            rowKey='id'
            pagination={{
                pageSize: limit,
                total,
                current: offset / limit + 1,
                onChange: nextPage => loadData({ offset: (nextPage - 1) * limit })
            }}
        />        
    );
    
}; 
