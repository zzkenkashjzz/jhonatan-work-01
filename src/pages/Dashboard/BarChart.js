import React from 'react';
import {Column, Line} from "@ant-design/charts";

const BarChart = () => {
    const data = [
        {
            type: 'Ene',
            sales: 38,
        },
        {
            type: 'feb',
            sales: 52,
        },
        {
            type: 'mar',
            sales: 61,
        },
        {
            type: 'abr',
            sales: 145,
        },
        {
            type: 'may',
            sales: 48,
        },
        {
            type: 'jun',
            sales: 38,
        },
        {
            type: 'jul',
            sales: 38,
        },
        {
            type: 'agos',
            sales: 38,
        },
        {
            type: 'oct',
            sales: 38,
        },
        {
            type: 'nov',
            sales: 38,
        },
        {
            type: 'dic',
            sales: 38,
        },
    ];
    const config = {
        data,
        xField: 'type',
        yField: 'sales',
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'bottom', 'middle',
            // 配置样式
            style: {
                fill: '#FFFFFF',
                opacity: 0.6,
            },
        },
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: 'type',
            },
            sales: {
                alias: 'sales',
            },
        },
    };
    return <Column autoFit={true} columnStyle={style.style} {...config} />;
}
export default BarChart;

const style = {
    style: {
        fill: '#b5b8b1',
        r:  80
    }
}
