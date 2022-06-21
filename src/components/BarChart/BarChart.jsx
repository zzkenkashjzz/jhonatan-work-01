import React from 'react';
import './BarChart.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import { Column } from '@ant-design/plots';
import CardHeader from "../card/cardHeader/Card/cardHeader";

const BarChart = ({data = [], title}) => {

    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        columnStyle: {
            fill: '#d9d9d9',
        },
        label: {
            // 可手动配置 label 数据标签位置
            position: 'top',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#3be5a6',
                opacity: 0.6,
            },
        },
        interactions: [
            {
                type: "active-region",
                enable: false,
            },
        ],
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <h3 className="card-title-custom-title">{title}</h3>
                </CardHeader>
                <CardBody>
                    <div className="barChart">
                        <Column style={{width: '100%'}} {...config} />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default BarChart;
