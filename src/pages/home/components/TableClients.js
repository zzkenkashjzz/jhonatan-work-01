import React, { useRef, useState } from 'react';
import { Button, Table, Avatar, Tooltip, Image, Checkbox, Typography, Row, Col, Spin, Popconfirm } from 'antd';
import { DownOutlined, FolderOpenOutlined, PictureOutlined, UpOutlined, LoadingOutlined, PlusOutlined, RedoOutlined, WarningOutlined } from '@ant-design/icons';
import DocumentsCRUD from '../../client-important-info/DocumentsCRUD';
import { TableListing } from './TableListing';
import { getSvgMarketPlace,nameToSlug } from '../../../utils/functions';
import partnerAPI from '../../../api/partner';
import { openNotification } from '../../../components/Toastr';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import partnerApi from "../../../api/partner";
import listingApi from "../../../api/listing";
import { useHistory } from 'react-router-dom';
import { getErrorMessage } from '../../../api/api';

const { Text } = Typography;
const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

export const TableClients = ({ data, getAllPartners }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const session = useSelector(store => store.Session.session);

    const checkBox = useRef();
    const [visible, setVisible] = useState(false);
    const [documentPartner, setDocumentPartner] = useState();
    const [loadingSyncStock, setLoadingSyncStock] = useState(false);
    const [loadingCreateListing, setLoadingCreateListing] = useState(false);
    const [loadingCanPublish, setLoadingCanPublish] = useState({ loading: false, index: null });
    const [loadingGetListingsFromMarketplaces, setLoadingGetListingsFromMarketplaces] = useState({ loading: false, index: null });
    const [getListings, setGetListings] = useState(false);

    const handleCanPublish = async (partner, index) => {
        let payload = { partnerId: partner.commercial_partner_id[0], canPublish: checkBox?.current?.state?.checked }
        setLoadingCanPublish({ loading: true, index: index });
        console.log(payload, 'parrr')
        await partnerAPI.updateCanPublish(payload)
            .then((response) => {
                console.log(response.data.success, 'ejem')
                if (response.data.success) {
                    openNotification({ status: true, content: 'Permiso actualizados' });
                } else {
                    openNotification({ status: false, content: 'Error al actualizar los permisos del partner' });
                }
            })
            .catch((error) => {
                openNotification({ status: false, content: 'Error al actualizar los permisos del partner' });
            });
        setLoadingCanPublish({ loading: false, index: null });
    }

    const handleNewListing = async (partner) => {
        setLoadingCreateListing(true);
        await partnerApi
            .insertListing(partner?.id)
            .then((res) => {
                const listingId = res.data;
                setLoadingCreateListing(false);
                history.push(`onboarding/${listingId}`);
            })
            .catch((error) => {
                setLoadingCreateListing(false);
                openNotification({
                    status: false,
                    content: "Error al crear un nuevo listing",
                });
            });
    };

    const syncFbaStockByPartner = async (partner, index) => {
        const values = { partnerId: partner?.id }
        setLoadingSyncStock({ loading: true, index: index });
        await listingApi.syncFbaStock(values)
            .then((result) => {
                openNotification({ status: true, content: 'Sincronización de stock con FBA de manera exitosa' });
                setGetListings(true);
            })
            .catch((error) => {
                openNotification({ status: false, content: getErrorMessage(error) });
            });
        setLoadingSyncStock({ loading: false, index: null });
    }

    const getListingsFromMarkteplaces = async (partner, index) => {
        try {
            setLoadingGetListingsFromMarketplaces({ loading: true, index: index });
            const { data } = await listingApi.getAllFromMkts(partner?.commercial_partner_id[0]);
            setGetListings(true);
            openNotification({ status: true, content: "Listings obtenidos desde los marketplaces con éxito" });
            setLoadingGetListingsFromMarketplaces({ loading: false, index: null });
        } catch (error) {
            openNotification({ status: false, content: error?.response?.data?.message || t('home.listing.error') });
            setLoadingGetListingsFromMarketplaces({ loading: false, index: null });
        }
    }

    const columns = [
        // {
        //     title: "",
        //     key: 'action',
        //     width: '5%'
        // },
        {
            title: "IMAGE",
            dataIndex: "image",
            key: "image",
            width: '7%',
            render: (text, record) => (
                <>
                    {record.image_1920 ? <Avatar src={<Image src={`data:image/png;base64, ${record.image_1920}`} />} /> : <Avatar icon={<PictureOutlined />} />}
                </>
            ),
        },
        {
            title: "NAME",
            dataIndex: "name",
            key: "name",
            width: '16%',
            render: (text, record) => (
                <Text ellipsis={{ tooltip: record.name }}>{record.name}</Text>
            )
        },
        {
            title: "PERMISO DE SYNC",
            dataIndex: "can_publish",
            key: "can_publish",
            width: '10%',
            render: (text, record, index) => (
                <Popconfirm
                    title={t('home.listing.confirmUpdateCanPublish')}
                    onConfirm={(e) => handleCanPublish(record, index)}
                    onCancel={() => { }}
                    icon={<WarningOutlined />}
                    okText={t('yes')}
                    cancelText={t('no')}
                    okButtonProps={{ style: { backgroundColor: '#5365E3' } }}
                >
                    <Tooltip placement="bottom" title={'El cliente tiene permiso para sincronizar su seller y publicar.'}>
                        <Checkbox id={nameToSlug(record?.display_name)} name={nameToSlug(record?.display_name)} ref={checkBox} defaultChecked={record?.x_can_publish}>
                            {loadingCanPublish.loading && loadingCanPublish.index === index ?
                                antIcon : <></>}
                        </Checkbox>
                    </Tooltip>
                </Popconfirm>
            )
        },
        {
            title: "LISTINGS",
            dataIndex: "listings",
            key: "listings",
            width: '7%',
            render: (text, record) => <span>{record?.listings}</span>
        },
        {
            title: "ACTIVE",
            dataIndex: "active",
            key: "active",
            width: '6%',
            render: (text, record) => (
                <>
                    <span>{record?.activeListings}</span>
                </>
            )
        },
        {
            title: "MARKETPLACES",
            dataIndex: "mktplace",
            key: "mktplace",
            width: '17%',
            render: (text, record) => (
                <div style={{ display: 'flex' }}>
                    {record?.marketplaces?.map((marketplace) => {
                        return <div style={{ marginRight: '10px' }}>{getSvgMarketPlace(marketplace, false)}</div>
                    })}
                </div>
            )
        },
        {
            title: "DOCUMENTOS",
            dataIndex: "documents",
            key: "documents",
            width: '8%',
            render: (text, record) => (
                <>
                    <Tooltip placement="topLeft" title="Ver documentos y videos">
                        <Button onClick={() => { setDocumentPartner(record.id); setVisible(true); }} icon={<FolderOpenOutlined />} className="home-clients-table-open-documents-button" type="text">Abrir</Button>
                    </Tooltip>
                </>
            ),
        },
        {
            title: "ACCIONES",
            dataIndex: "-",
            key: "-",
            width: '27%',
            render: (text, record, index) => (
                <Row>
                    <Col span={8}>
                        <Tooltip placement="top" title={t('home.listing.tooltipSyncListings')}>
                            <Button size="small"
                                icon={loadingGetListingsFromMarketplaces.loading && loadingGetListingsFromMarketplaces.index === index ?
                                    <Spin indicator={antIcon} /> : <RedoOutlined />}
                                className="btn-primary"
                                onClick={() => getListingsFromMarkteplaces(record, index)}
                                disabled={!record?.marketplaces?.length > 0 || !record.x_can_publish}
                            >
                                {' '}{t('home.listing.syncListings')}
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Tooltip placement="top" title={t('home.listing.tooltipSyncStockFBA')}>
                            <Button size="small"
                                icon={loadingSyncStock.loading && loadingSyncStock.index === index ? <Spin indicator={antIcon} /> : <RedoOutlined />}
                                className="btn-primary margin-left-10"
                                disabled={!record?.marketplaces?.length > 0 || !record.x_can_publish}
                                onClick={() => syncFbaStockByPartner(record, index)}
                            >
                                {' '}{t('home.listing.syncStockFBA')}
                            </Button>
                        </Tooltip>
                    </Col>
                    <Col span={8}>
                        <Button size="small"
                            icon={<PlusOutlined />}
                            className={record?.marketplaces?.length > 0 ? "btn-primary margin-left-10" : "margin-left-10"}
                            disabled={!record.x_can_publish }
                            onClick={() => handleNewListing(record)}
                        >
                            {t('home.listing.add')}
                        </Button>
                    </Col>
                </Row>
            ),
        },
    ];

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = selectedRowKeys => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const expandedRoww = (record, index) => {
        return <div style={{ marginLeft: '20px' }}>
            <TableListing
                profileCompleted={null}
                partnerId={record.id}
                selectable={false}
                getListings={getListings}
                setGetListings={setGetListings}
                paginationPosition={['bottomRight']}
            />
        </div>
    }

    return (
        <>
            <DocumentsCRUD visible={visible} setVisible={setVisible} partner={documentPartner} />
            <div className="App">
                <Table columns={columns} dataSource={data.map((item, index) => ({ ...item, key: nameToSlug(item?.display_name) }))}
                    //  rowSelection={rowSelection} 
                    scroll={{ x: 1700, y: 600 }}
                    expandable={{
                        expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? (
                                <UpOutlined onClick={e => onExpand(record, e)} />
                            ) : (
                                <DownOutlined onClick={e => onExpand(record, e)} />
                            ),
                        columnWidth: 50
                    }}
                    expandedRowRender={(record, index) => expandedRoww(record, index)}
                />
            </div>
        </>
    )
}
