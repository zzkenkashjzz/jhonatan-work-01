import React from 'react';
import './ProgressChart.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import ProgressBar from "../progressbar/ProgressBar";


const ProgressChart = (
    {
        title,
        percent,
        rightPercent,
        leftPercent,
        rightLabel,
        leftLabel
    }) => (
    <div className="progress-chart">
        <Card>
            <h3 className="null-margin">{title}</h3>
            <br/>
            <CardBody>
                <div className="chart-body">
                    <div className="row" >
                        <div className="item_center margin-right-label-chart">
                            <span className="pre-percent">{leftPercent}%</span>
                        </div>
                        <ProgressBar percent={percent}/>
                        <div className="item_center margin-left-label-chart">
                            <span className="pre-percent">{rightPercent}%</span>
                        </div>
                    </div>
                    <br/>
                    <div className="row justify-content-space-between">
                        <div>
                            <label><span className="dot"/> {leftLabel}</label>
                        </div>
                        <div>
                            <label><span className="dot"/>{rightLabel}</label>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    </div>
);

export default ProgressChart;
