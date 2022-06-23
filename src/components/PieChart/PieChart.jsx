import './PieChart.css'

import {Pie} from "@ant-design/plots";
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import CardHeader from "../card/cardHeader/Card/cardHeader";

export const PieChart = (
    {
        data,
        unitBaseSuffix = '',
        unitBasePrefix = '',
        title = 'Not title',
        legendPosition = 'bottom', // right
    }
) => {
    const total = data.map(item => item.value).reduce((a, b) => a + b, 0);
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        color: ['#3be5a6', '#020c33', '#e8e8e8'],
        radius: 1,
        innerRadius: 0.75,
        label: {
            type: 'inner',
            offset: '-50%',
            content: function content(_ref) {
                return `${unitBasePrefix}`.concat(_ref.value, unitBaseSuffix);
            },
            autoRotate: false,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
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
                    // fontSize: 20,
                },
                content: `${unitBasePrefix} ${total} ${unitBaseSuffix}`,
            },
        },
        legend: {
            layout: legendPosition === 'bottom' ? 'horizontal' : 'vertical',
            position: legendPosition
        }
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
