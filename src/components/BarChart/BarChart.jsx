import React from 'react';
import './BarChart.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import { Column } from '@ant-design/plots';
import CardHeader from "../card/cardHeader/Card/cardHeader";

const BarChart = ({data = [], title, yLabel, xLabel}) => {

    const max = Math.max(...data.map(item => item[yLabel]))

    const config = {
        data,
        xField: xLabel,
        yField: yLabel,
        columnWidthRatio: 0.8,

        xAxis: {
            grid: null,
            label: {
                autoHide: true,
                autoRotate: false,
                style: {
                    fill: '#020c33',
                    fontSize: 15,
                }
            },
        },
        yAxis: {
            grid: null,
            max: max + 1,
            label: {
                style: {
                    opacity: 0
                }
            }
        },
        columnStyle: {
            fill: '#e8e8e8',
        },
        label: {
            position: 'top',
            style: {
                fill: '#3be5a6',
                opacity: 1,
            },
        },
        interactions: [
            {
                enable: true,
                type: "active-region",
                cfg: {
                    style: {
                        fill: '#3be5a6',
                    }
                }
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
