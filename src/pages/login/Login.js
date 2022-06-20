import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Divider, Col, Button, Form, Input, Alert, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import newLogo from '../../assets/LAP_Marketplace.jpg';
import { useTranslation } from 'react-i18next';
import authApi from '../../api/auth';
import { useDispatch, useSelector } from "react-redux";
import * as Actions from '../../redux/session/action';
import { keyPressSpaceBar } from '../../utils/functions';
import { useLocation } from 'react-router'
import * as queryString from 'query-string';

import './login.css';

const { Item } = Form;

export const Login = () => {

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const error = useSelector(store => store.Session.error);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const [form] = Form.useForm();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value.trim()
        });
    };

    async function login() {
        setLoading(true);
        dispatch(Actions.login());
        let creds = {...credentials}
        let qs = queryString.parse(location.search);
        if(qs && qs.link) {
            creds.link = qs.link;
        }
        authApi.login(creds)
            .then(res => {
                if (res.status === 200 && res.data.success) {
                    dispatch(Actions.loginSucces(res.data));
                    return window.location = "/";
                } else {
                    dispatch(Actions.loginFailed(res.data.message));
                }
                setLoading(false);
            })
            .catch(error => {
                dispatch(Actions.loginFailed(error.data.message));
                setLoading(false);
            })
    }

    const formItemLayout = {
        labelCol: {
            span: 3,
        },
        wrapperCol: {
            span: -3,
        },
        layout: "vertical"
    }

    return (
        <div className="login-container">

            <Row justify="space-around" align="middle" className="login-layout">
                <Col span={8}>
                    <Spin spinning={loading}>

                        <div className="login-logo-container">
                            <img src={newLogo} className="login-logo" />
                            <span className="login-title">Ingresar</span>
                        </div>
                        <Divider orientation="left" className="login-divider" />
                        <Form name="formulario"
                            {...formItemLayout}
                            onFinish={login}
                            form={form}>
                            <Item className="login-email-item"
                                label=''
                                name='email'
                                rules={[{
                                    required: false,
                                    message: t('login.emailEmpty')
                                }, { type: 'email' }]}
                            >
                                <Input name="username" type="email" placeholder={t('login.emailPlaceholder')}
                                    onChange={(e) => handleChange(e)} onKeyPress={(e) => keyPressSpaceBar(e)} />
                            </Item>
                            <Item className="login-password-item"
                                label=''
                                name='password'
                                rules={[{
                                    required: false,
                                    message: t('login.passwordEmpty')
                                }]}
                            >
                                <Input.Password name="password" type="password" placeholder="********"
                                    onChange={(e) => handleChange(e)} onKeyPress={(e) => keyPressSpaceBar(e)}
                                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Item>
                            {error && (
                                <Col span={24} className="login-error">
                                    <Alert message={error} type="error" />
                                </Col>
                            )}
                            <Col span={24} className="login-button-container">
                                <Link to="/recover-password" >
                                    <Button type="link" className="btn-primary" className="btn-primary">{t('login.recoverPassword')}</Button>
                                </Link>
                                <Button loading={loading} className="btn-primary" htmlType="submit" disabled={!credentials.username || !credentials.password}>{t('login.enter')}</Button>
                            </Col>
                        </Form>
                    </Spin>

                </Col>
            </Row>

        </div>
    )
}
