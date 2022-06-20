import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Pages
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { NotFound } from './pages/NotFound';
import { MyAccount } from './pages/myAccount/MyAccount';

import { SessionExpired } from './pages/SessionExpired';
import DocumentsCRUD from './pages/client-important-info/DocumentsCRUD';
// Auth
import { isExpired } from './helpers/auth-helpers';
import { initAxiosInterceptors } from './api/api';
// Redux
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from './routers/PrivateRoute';
import { Onboarding } from './pages/onboarding/Onboarding';
import RequestPasswordReset from './pages/login/RequestPasswordReset';
import ResetPassword from './pages/login/ResetPassword';
import { Order } from './pages/order/Order';
import { NewOrder } from './pages/order/NewOrder';
import { Analytics } from './pages/analytics/Analytics';
import { DataStudio } from './pages/dataStudio/DataStudio';
import { ServerStatus } from './pages/status/ServerStatus';
import * as queryString from 'query-string';
import accessKeysApi from './api/aws-access-keys'
import { Spin } from 'antd';
import Dashboard from "./api/dashboard";
import DashboardTest from "./pages/Dashboard/Dashboard";
import Page from "./components/Page/Page";

const AppRouter = () => {
    const dispatch = useDispatch();
    const session = useSelector(store => store.Session.session);
    const language = useSelector(store => store.Session.language);
    const [loadingConsent, setLoadingConsent] = useState(false);
    const token = session?.token;
    if (token) {
        if (isExpired(token) && !['/login', '/recover-password', '/my-account/seller-account/Shopify'].includes(window.location.pathname) && !window.location.pathname.includes('/reset-password')) {
            window.location = "/session-expired";
        } else {
            initAxiosInterceptors(token, language);
        }
    } else if (!token && !['/login', '/recover-password', '/my-account/seller-account/Shopify/consent'].includes(window.location.pathname) && !window.location.pathname.includes('/reset-password')) {
        let qs = queryString.parse(window.location.search);
        if(qs && qs.hmac && qs.shop) {
            //get correct url
            setLoadingConsent(false);
            accessKeysApi.getConsentUrl(0, 'Shopify').then((resp) => {
                let shop = qs.shop.replace('.myshopify.com','');
                window.location = resp.data.consentUrl.replace('%%shop%%', shop);
                setLoadingConsent(false);
            }).catch(() => {
                window.location = '/login';
                setLoadingConsent(false);
            });
        } else {
            window.location = '/login';
        }
        
    }
    
    return (
        <Spin spinning={loadingConsent}>
            {!loadingConsent&&<Router>
                <div className="App">
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/recover-password" component={RequestPasswordReset} />
                        <Route exact path="/reset-password/:partnerId" component={ResetPassword} />
                        <Route exact path="/session-expired" component={SessionExpired} />
                        <Route path="/my-account/seller-account/:marketplace/:consent" component={MyAccount}/>

                        <PrivateRoute exact path="/" component={Home} roles={['Admin', 'Client', 'Braian Cliente', 'Lap']}/>
                        
                        <PrivateRoute path="/my-account" component={MyAccount} roles={['Admin', 'Client']}/>
                        <PrivateRoute exact path="/orders" component={Order} roles={['Admin', 'Client', 'Lap']}/>
                        <PrivateRoute exact path="/orders/:orderId" component={NewOrder} roles={['Admin', 'Client', 'Lap']}/>
                        <PrivateRoute path="/onboarding/:listingId" component={Onboarding} roles={['Admin', 'Client', 'Lap']}/>
                        <PrivateRoute path="/analytics" component={Analytics} roles={['Admin', 'Client', 'Lap']}/>
                        <PrivateRoute path="/status" component={ServerStatus} roles={['Admin', 'Lap']}/>
                        <PrivateRoute path="/data-studio/:option/:url" component={DataStudio} roles={['Admin', 'Client', 'Lap']}/>
                        <PrivateRoute path="/test" component={DocumentsCRUD} roles={['Admin', 'Lap']}/>
                        <PrivateRoute path="/dash" component={DashboardTest} roles={['Admin', 'Client', 'Braian Cliente', 'Lap']}/>
                        <PrivateRoute path="/dashboard" component={Page} roles={['Admin', 'Client', 'Braian Cliente', 'Lap']}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router>
            }
        </Spin>
    )
}
export default AppRouter
