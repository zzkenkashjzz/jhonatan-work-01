import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isExpired } from '../helpers/auth-helpers';
import { Headers } from '../layouts/Headers';
import { Layout } from 'antd';
import { useSelector } from "react-redux";

const { Content, Footer } = Layout;

export default function PrivateRoute({ component: Component, roles, ...rest }) {
    
    const session = useSelector(store => store.Session.session);
    const [token, setToken] = useState(session ? session.token : null);

    const isAuthorized = () => {
        if (token && session && roles) {
            if(session.userInfo.login.split('@')[0].toUpperCase() === 'TECH') {
                return roles.includes('Lap');
            }
            return roles.includes(session.userInfo.role);
        }
        return false;
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout className="site-layout">
                <Headers />
                <Content>
                    {isAuthorized() ?
                        <Route {...rest}>
                            {!isExpired(token) ?
                                <Component /> : <Redirect to="/session-expired" />
                            }
                        </Route> : <Redirect to="/login" />}
                </Content>
                <Footer style={{ textAlign: 'center' }}> LAP Tech ©2021 </Footer>
            </Layout>
        </Layout>
    )
}
