import React from 'react'
import UserProfile from '../components/UserProfile';
import Layout from '../components/Layouts';

const Dashboard = ({ navigation, token, route }) => {
    return (
        <Layout>
            <UserProfile />
        </Layout> 
    )
}

export default Dashboard
