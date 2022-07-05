import React, {useEffect, useState} from 'react';
import './BarChart.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import { Column } from '@ant-design/plots';
import CardHeader from "../card/cardHeader/Card/cardHeader";
import {Select} from "antd";
import {Option} from "antd/es/mentions";
import * as dayjs from 'dayjs'


const BarChart = (
    {
        data = [],
        title,
        yLabel,
        xLabel,
        defaultFormat = 'MMM',
        suffixLabel = '',
        prefixLabel = '',
        formatterLabel,
        onDataClick,
        onChangeFormat
    }) => {

    const applyGroupingToData = () => {
        return data.map( value => ({...value, [xLabel]:  dayjs(value[xLabel]).format(defaultFormat)}))
    }

    const max = Math.max(...data.map(item => item[yLabel]))

    const config = {
        data: applyGroupingToData(),
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
                fontSize: 18
            },
            formatter: (datum => {
                const total = applyGroupingToData().filter(item => item[xLabel] === datum[xLabel]).map(val => val[yLabel]).reduce((a, b) => a + b, 0);
                return formatterLabel ?
                    formatterLabel(data[total])  :
                    `${prefixLabel}${total}${suffixLabel}`
            }),
        },
        tooltip: {
            formatter: (datum) => {
                const quantity = applyGroupingToData().filter(item => item[xLabel] === datum[xLabel]).map(val => val.quantity).reduce((a, b) => a + b, 0);
                return {name: 'Units', value: quantity};
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

    const  handlePlotClick = (e) => {
        if (onDataClick && e.type === "plot:click") onDataClick(e)
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className='barChart-header-card'>
                        <h3 className="card-title-custom-title">{title}</h3>
                        <Select
                            defaultValue={defaultFormat}
                            style={{
                                width: 120,
                                marginLeft: 'auto'
                            }}
                            onChange={(e) => onChangeFormat(e)}
                        >
                            <Option value="MMM">Mes</Option>
                            <Option value="YYYY">Year</Option>
                        </Select>
                    </div>
                </CardHeader>
                <CardBody>
                    <div className="barChart">
                        <Column style={{width: '100%'}} {...config} onEvent={(chart , event) => handlePlotClick(event)} />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
};

export default BarChart;
