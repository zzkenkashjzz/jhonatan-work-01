import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Support from './components/Support';
import Listing from './components/Listing';
import Products from './components/Products';
import { Row, Col, Button, Card, Spin, Typography, Input, Select, DatePicker, Layout, Skeleton, List, Avatar } from 'antd';
import Documents from './components/Documents';
import StockModal from './components/StockModal';
import AnalyticsFilter from './components/AnalyticsFilter';
import DashboardTable from './components/DashboardTable';
import { RedoOutlined } from '@ant-design/icons';
import { checkProfile, scrollClass, scrapingCurrencyGoogle, nameToSlug } from '../../utils/functions';
import partnerApi from '../../api/partner';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/partner/action';
import { useTranslation } from 'react-i18next';
import { getErrorMessage } from '../../api/api';
import 'antd/dist/antd.css';
import './home.css';

export const Home = () => {
    const { Option } = Select;
    const { Title, Link } = Typography;
    const dispatch = useDispatch();
    const session = useSelector(store => store.Session.session);
    const [profileCompleted, setProfileCompleted] = useState(false);
    const [listingCounter, setListingCounter] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [countListings, setCountListings] = useState([]);

    let partnerId = 1; // admin
    const isAdmin = session.userInfo.isAdmin;
    if (!isAdmin) {
        partnerId = session.userInfo.commercial_partner_id[0];
    }

    const { t } = useTranslation();

    const [initLoading, setInitLoading] = useState(true);
    const [dashboardAnalitycs, setDashboardAnalitycs] = useState([]);
    const [isHelpVisible, setIsHelpVisible] = useState(false);

    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    }

    useEffect(() => {
        if (session.userInfo.website) {
            let validData = session.userInfo.website.split('https://datastudio.google.com/embed/reporting/')
            if (validData[0] === "") {
                let valueArrayViejo = validData.splice(1)
                let newData = valueArrayViejo.map((data, index) => {
                    return {
                        id: index,
                        name: index === 0 ? 'Ventas' : index === 1 ? 'Marketing' : index === 2 ? 'Reportes en vivo' : 'NameDefault',
                        url: `https://datastudio.google.com/embed/reporting/${data}`,
                    }
                })
                setInitLoading(false)
                setDashboardAnalitycs(newData)
            } else {
                let link = new String(session.userInfo.website);
                let arrayBase = link.split('[');
                if (Array.isArray(arrayBase) && arrayBase?.length > 1) {
                    try {
                        let newJson = JSON.parse(`[${arrayBase[1]}`);
                        setDashboardAnalitycs(newJson);
                    } catch (error) {
                        console.log('Error on setDashboardAnalitycs Headers, ', error);
                    }
                }
                setInitLoading(false)
            }
        }
    }, [])

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
                        console.log(listingCounter)
                    }
                    else { console.log(res.data.message) }
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }, [])

    const linkAdapte = (value) => {
        let link = new String(value)
        let arrayBase = link.split('https://datastudio.google.com/embed/reporting/')
        let arrayFinal = arrayBase.splice(1)
        return arrayFinal[0]
    }

    const toggleIsHelpVisible = () => {
        if (isHelpVisible) {
            setIsHelpVisible(false);
        } else {
            setIsHelpVisible(true);
        }
    }


    return (
        <div className="content-div" style={{ backgroundColor: '#f9f9f9' }}>
            <Row>
                <Col span={11} style={{ textAlign: 'left' }}>
                    <Card bordered={false} style={{ width: '98.5%', height: '100%' }}>
                        <Row>
                            <Col span={12}>
                                <Title level={3} className="titlePages">Bienvenido {session?.userInfo?.name}</Title>
                                {!session?.userInfo?.isAdmin && <span>¡Completa tus datos y empecemos a vender más!</span>}
                            </Col>
                        </Row>
                        {!session?.userInfo?.isAdmin &&
                            <Row>
                                <Col span={12}>
                                    <div className="home-info">
                                        <div>
                                            <RedoOutlined />
                                            <span className="home-info-text">{`Tienes ${listingCounter?.data ? listingCounter.data.length : 0} Listing(s) cargado(s)`}</span>
                                        </div>
                                        <div>
                                            <RedoOutlined />
                                            <span className="home-info-text">Pendientes LAP: {countListings?.Pendiente}</span>
                                        </div>
                                        <div>
                                            <RedoOutlined />
                                            <span className="home-info-text">Notificaciones: 0</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        }
                    </Card>
                </Col>
                <Col span={13}>
                    <Card bordered={false} style={{ width: '100%', height: '100%' }}>
                        <Row justify="end">
                            <Col >
                                <span className="home-ultima-actualizacíon">Última actualización : Hoy - 13:22 p.m {' '}<span><Button icon={<RedoOutlined />} /></span></span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Row style={{ marginTop: 60 }}>
                                    <Col span={3} style={{ marginRight: 10 }}>
                                        <Input placeholder="SKU" style={{ width: '100%' }} />
                                    </Col>
                                    <Col span={4} style={{ marginRight: 10 }}>
                                        <Select placeholder="Marketplace" style={{ width: '100%' }} onChange={handleChange}>
                                            <Option value="amazon">Amazon</Option>
                                            <Option value="ebay">eBay</Option>
                                            <Option value="shopify">Shopify</Option>
                                            <Option value="walmart">Walmart</Option>
                                        </Select>
                                    </Col>
                                    <Col span={5} style={{ marginRight: 10 }}>
                                        <Select placeholder="Performance" style={{ width: '100%' }} onChange={handleChange}>
                                            <Option value="performance">Performance</Option>
                                        </Select>
                                    </Col>
                                    <Col span={5} style={{ marginRight: 10 }}>
                                        <DatePicker onChange={onChange} style={{ width: '100%' }} />
                                    </Col>
                                    <Col span={3} style={{ marginRight: 10 }}>
                                        <Select placeholder="Mensual" style={{ width: '100%' }} onChange={handleChange}>
                                            <Option value="Mensual" disabled>
                                                Mensual
                                            </Option>
                                        </Select>
                                    </Col>
                                    <Col>
                                        <Button type="primary">Buscar</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ marginRight: 10 }}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={24} style={{ textAlign: 'left' }}>
                                    <Title level={5}>Reportes</Title>
                                    <List loading={initLoading}
                                        itemLayout="horizontal"
                                        dataSource={dashboardAnalitycs}
                                        renderItem={(item) => (
                                            <List.Item>
                                                <Skeleton avatar title={false} loading={item.loading} active>
                                                    <List.Item.Meta title={<Link href={`/data-studio/${nameToSlug(item.name)}/${linkAdapte(item.url)}`}>{item.name}</Link>} />
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={14} style={{ marginRight: 10 }}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Title level={5}>Resumen de ventas</Title>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col span={9}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Title level={5}>Resumen de ventas TOP</Title>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={10} style={{ marginRight: 10 }}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Title level={5}>Resumen de ventas</Title>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col span={7} style={{ marginRight: 10 }}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Title level={5}>Más vendidos</Title>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
                <Col span={6}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Title level={5}>Marketplace</Title>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <div className="site-card-border-less-wrapper" style={{ marginTop: 10 }}>
                        <Card bordered={false} style={{ width: '100%' }}>
                            <Row>
                                <Col span={12} style={{ textAlign: 'left' }}>
                                    <Title level={5}></Title>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24} style={{ textAlign: 'left', marginTop: 30, overflowY: 'hidden' }}>
                                    <Row>
                                        <Layout className="padding-layout" style={{ width: '100%' }}>
                                            <div className="site-layout-background padding-layout-content content-padding" style={{ width: '100%' }}>
                                                <Col span={24} xs={24} sm={24} md={24}>
                                                    <AnalyticsFilter isAdmin={isAdmin} partnerId={partnerId} />
                                                </Col>
                                            </div>
                                        </Layout>
                                    </Row>
                                    <Row>
                                        <Layout className="padding-layout" style={{ width: '100%' }}>
                                            <div className="site-layout-background padding-layout-content content-padding" style={{ width: '100%' }}>
                                                <Col span={24} xs={24} sm={24} md={24}>
                                                    <DashboardTable></DashboardTable>
                                                </Col>
                                            </div>
                                        </Layout>
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}