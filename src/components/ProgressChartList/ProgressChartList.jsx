import React from "react";
import ProgressChart from "../ProgressChart/ProgressChart";

const ProgressChartList = ({progressList}) => (
    <>
        {progressList?.map(progress => (
            <div> <ProgressChart {...progress} /></div>
        ))}
    </>
)

export default ProgressChartList
