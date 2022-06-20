import React from 'react';
import {Column, Line, Pie} from "@ant-design/charts";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
const DonutChart2 = () => {
    const percentage = 80;


    return  (
        <div style={{ width: 200, height: 200 }}>
            <CircularProgressbar
                value={percentage} text={`${percentage}%`}
                styles={buildStyles({
                     // Rotation of path and trail, in number of turns (0-1)
                 rotation: 0.25,

                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                 strokeLinecap: 'butt',

                 // Text size
                 textSize: '16px',

                 // How long animation takes to go from one percentage to another, in seconds
                 pathTransitionDuration: 0.5,

                 // Can specify path transition in more detail, or remove it entirely
                 // pathTransition: 'none',

                 // Colors
                 pathColor: `rgba(144, 152, 157, ${percentage / 100})`,
                 textColor: 'rgba(199,193,193,0.55)',
                 trailColor: '#c9c6c6',
                 backgroundColor: 'rgba(199,193,193,0.55)' })}

            />

        </div>
    )
}
export default DonutChart2;

