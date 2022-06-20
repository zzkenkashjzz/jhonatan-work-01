import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Support from './components/Support';
import Listing from './components/Listing';
import { Row, Col, Button, Card, Spin } from 'antd';
import Documents from './components/Documents';
import StockModal from './components/StockModal';
import {
    UpOutlined, DownOutlined, CheckCircleFilled, CaretRightOutlined, ExclamationCircleFilled,
    UnorderedListOutlined, DatabaseOutlined, UpSquareOutlined, TagTwoTone
} from '@ant-design/icons';
import { checkProfile, scrollClass, scrapingCurrencyGoogle } from '../../utils/functions';
import partnerApi from '../../api/partner';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/partner/action';
import Clients from './components/Clients';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from '../../api/api';
import OrderSales from './components/OrderSales';
import FulfillmentModal from './components/FulfillmentModal';
import 'antd/dist/antd.css';
import './home.css';

export const Home = () => {

    const dispatch = useDispatch();
    const session = useSelector(store => store.Session.session);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [listingCounter, setListingCounter] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [countListings, setCountListings] = useState([]);

    const { t } = useTranslation();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFullfilmentModalVisible, setFullfilmentModalVisible] = useState({ state: false, data: [] });

    const [isHelpVisible, setIsHelpVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        scrapingCurrencyGoogle('USD', 'EUR')
    }, [])

    useEffect(() => {
        if (session) {
            setLoadingProfile(true);
            dispatch(Actions.getPartner());
            partnerApi.findById(session.userInfo.partner_id[0])
                .then(res => {
                    if (res.status === 200) {
                        delete res.data.x_product_template_ids;
                        dispatch(Actions.getPartnerSuccess(res.data));
                        // setProfileCompleted(checkProperties(res.data));
                        setProfileCompleted(checkProfile(res.data, session.userInfo));
                        setLoadingProfile(false);
                    }
                    else { dispatch(Actions.getPartnerFailed(res.data.message)); }
                })
                .catch(error => {
                    setLoadingProfile(false);
                    dispatch(Actions.getPartnerFailed(getErrorMessage(error)));
                })
        }
    }, [])

    useEffect(() => {
        if (session) {
            const values = {
                partnerId: session.userInfo.commercial_partner_id[0]
            }
            partnerApi.getListingsPerPage(values)
                .then(res => {
                    if (res.status === 200) {
                        let arrList = res?.data?.data.map(obj => obj.state)
                        let count = {}
                        arrList.forEach(function (x) { count[x] = (count[x] || 0) + 1 })
                        setListingCounter(res.data);
                        setCountListings(count)
                    }
                    else { console.log(res.data.message) }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    const toggleIsHelpVisible = () => {
        if (isHelpVisible) {
            setIsHelpVisible(false);
        } else {
            setIsHelpVisible(true);
        }
    }

    return (
        <div className="content-div home">
            {session && session.userInfo.role !== 'Admin' ?
                <>
                    <Row className="welcome-bar">
                        <Col span={8} xs={24} sm={8} md={8}>
                            <Row className="home-status-container">
                                <Col span={24} xs={24} sm={24} md={24}><span className="home-welcome-text">
                                    {t('home.welcome')}, {session ? session.userInfo.name : '@user'}</span><br />
                                    <Spin spinning={loadingProfile}>
                                        <Link to="/my-account" >
                                            {profileCompleted?.res ?
                                                <CheckCircleFilled className="dot-green" /> : <ExclamationCircleFilled className="dot-red" style={{ marginRight: "10px" }} />}
                                            <span>{t(profileCompleted.msj1)}</span>
                                        </Link>
                                        {(listingCounter?.data) && (
                                            <>
                                                <br />
                                                {(listingCounter.data.length > 0) && (
                                                    <>
                                                        <CheckCircleFilled className="dot-green" />
                                                        <span>{t('option.listingsCargados')}</span>
                                                    </>
                                                )}
                                                {/*(listingCounter.data.length < 1) && (
                                                    <>
                                                        <CaretRightOutlined />
                                                        <span>{t('option.needSyncPermission')}</span>
                                                    </>
                                                )*/}
                                            </>
                                        )}
                                        {(profileCompleted?.msj2 && !session?.userInfo?.sellerAccountStatus) && (
                                            <>
                                                <br />
                                                {(profileCompleted?.msj2 == 'option.mustAddSeller') && (
                                                    <Link to="/my-account?step=2" >
                                                        <ExclamationCircleFilled className="dot-red" style={{ marginRight: "10px" }} />
                                                        <span>{t('option.mustAddSeller')}</span>
                                                    </Link>
                                                )}
                                            </>
                                        )}
                                        {(session?.userInfo?.sellerAccountStatus && session?.userInfo?.x_can_publish) && (
                                            <>
                                                <br />
                                                <CheckCircleFilled className="dot-green" style={{ marginRight: "10px" }} />
                                                <span>{t('option.sellerSync')}</span>
                                            </>
                                        )}
                                    </Spin>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} xs={24} sm={12} md={12} className="home-status-listing">
                            <Row className="resume">
                                <Col span={24} className="resume-listing">
                                    <span className="home-welcome-text">
                                        Resumen</span><br />
                                    <span className="home-resume-text">
                                        {(listingCounter?.data) &&
                                            <UnorderedListOutlined />}
                                        {(listingCounter?.data) &&
                                            "Tienes " + listingCounter?.data.length + " Listing(s) cargado(s)"}
                                    </span>
                                    <ul>
                                        {(countListings) && Object.keys(countListings).map(llave => (
                                            <li><CaretRightOutlined /><span className="title-status">{llave}:</span>
                                                <span className="count-status">{countListings[llave]}</span></li>
                                        ))
                                        }
                                    </ul>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={8} xs={24} sm={4} md={4} style={{ paddingRight: 12 }} className="text-align-right">
                            <Button type="primary" className="resources" ghost onClick={toggleIsHelpVisible} icon={isHelpVisible ? <DownOutlined /> : <UpOutlined />}><br /><DatabaseOutlined />{t('home.assistance')}</Button>
                            {/* <Button icon={<GoldOutlined />} disabled className="btn-primary margin-left-10" onClick={() => setIsModalVisible(true)}>{t('home.viewStock')}</Button> */}
                        </Col>
                    </Row>
                    {
                        !isHelpVisible &&
                        <Row className="utils-documents">
                            <Col span={24}>
                                <Documents />
                            </Col>
                        </Row>
                    }
                    <Row className="account-status">
                        <Col span={24}>
                            <Listing profileCompleted={profileCompleted.res} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <OrderSales profileCompleted={profileCompleted.res}
                                modalVisible={isFullfilmentModalVisible} setModalVisible={setFullfilmentModalVisible}
                            />
                        </Col>
                    </Row>
                    <Row className="support">
                        <Col span={24}>
                            <Support />
                        </Col>
                    </Row>
                </> :
                <>
                    <Row className="clientes">
                        <Col span={24}>
                            <Card>
                                <Clients />
                            </Card>
                        </Col>
                    </Row>
                    <Row className="fullfilment">
                        <Col span={24}>
                            <Card>
                                <OrderSales
                                    profileCompleted={profileCompleted && session?.userInfo?.sellerAccountStatus}
                                    setModalVisible={setFullfilmentModalVisible}
                                />
                            </Card>
                        </Col>
                    </Row>
                </>
            }

            <FulfillmentModal
                setModalVisible={setFullfilmentModalVisible}
                isModalVisible={isFullfilmentModalVisible} />
            <StockModal
                isModalVisible={isModalVisible}
                handleCancel={handleCancel}
                handleOk={handleOk} />
            <div className="floating-menu">
                <ul>
                    <li onClick={() => scrollClass('header')}>
                        <UpSquareOutlined />
                    </li>
                    {session.userInfo.role !== 'Admin' && (
                        <li onClick={() => scrollClass('listings-main')}>
                            <UnorderedListOutlined /> Listings
                        </li>
                    )}
                    <li onClick={() => scrollClass('orders-status')}>
                        <TagTwoTone /> Pedidos
                    </li>
                </ul>
            </div>
        </div>
    )
}