import React from 'react';
import './BarChart.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import { Column } from '@ant-design/plots';

const BarChart = ({chartConfig}) => (
    <div>
        <Card>
            <h3>Ordenes</h3>
            <CardBody>
                <div className="barChart">
                    <Column {...chartConfig} />
                </div>
            </CardBody>
        </Card>
    </div>
);

export default BarChart;
