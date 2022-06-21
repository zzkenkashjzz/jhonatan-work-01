import './PieChart.css'

import {Pie} from "@ant-design/plots";
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import CardHeader from "../card/cardHeader/Card/cardHeader";

export const PieChart = ({data, staticContent = '', title = 'Not title'}) => {
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color: ['#3be5a6', '#020c33', '#e8e8e8'],
        radius: 1,
        innerRadius: 0.9,
        legend: true,
        label: true,
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: staticContent,
            },
        },
    };
    return (
        <Card>
            {<CardHeader>
                <h3 className="pie-chart-title">{title}</h3>
            </CardHeader>}
            <CardBody>
                <Pie {...config} />
            </CardBody>
        </Card>)
}
