import React from 'react';
import './TableChart.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import {Table} from "antd";


const TableChart = ({tableColumns, tableData}) => (
    <Card>
        <h3>Datos Generales</h3>
        <br/>
        <CardBody>
            <Table columns={tableColumns} dataSource={tableData}/>
        </CardBody>
    </Card>
);

export default TableChart;
