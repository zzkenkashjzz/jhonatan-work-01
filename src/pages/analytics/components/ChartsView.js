import {Card, Col, Row} from "antd";
import BarChart from "../../../components/BarChart/BarChart";
import {BAR_CHART_DATA as barChartConfig} from "../../../services/barchart-data";
import {TableTop} from "../../../components/TableTop/TableTop";
import {TableTopData} from "../../../services/table-data";
import CardBody from "../../../components/card/cardBody/Card/cardBody";
import {PieChart} from "../../../components/PieChart/PieChart";
import {PieData, PieData2, PieData3} from "../../../services/progress-data";
import {useEffect, useState} from "react";
import {groupingSalesByPurchaseDate} from "../../../helpers/analytic-helper";
import {Indicator} from "../../../components/Indicator/Indicator";

export const ChartsView = ({data}) => {

    const [defaultFormatData, setDefaultFormatData] = useState('MMM')

    const handlePointClick = (e) => console.log(e);


    const getSalesForDates = (chartdata) => {
        return groupingSalesByPurchaseDate(chartdata);
    }

    const getSumQuantitySold = (chartdata) => chartdata[0]?.sumQuantitySold;

    const getSumTotalSold = (chartdata) => chartdata[0]?.sumTotalSold;

    return (
        <>
            <Row>
                <Col span={12}>
                    <Indicator value={getSumQuantitySold(data)} suffix=" Units" title="Cantidad de ventas"/>
                </Col>
                <Col span={12}>
                    <Indicator value={getSumTotalSold(data)} prefix="$ " title="Total de ventas"/>
                </Col>
            </Row>
            <Row>
                <Col span={15} >
                   <BarChart
                       data={getSalesForDates(data)}
                       xLabel="type"
                       yLabel="sales"
                       title="Ordenes"
                       onDataClick={handlePointClick}
                       prefixLabel="$ "
                       suffixLabel=".00"
                       defaultFormat={defaultFormatData}
                       onChangeFormat={e => setDefaultFormatData(e)}
                   />
                </Col>
                <Col span={9}>
                    <TableTop topData={TableTopData} title="Top Productos" />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <PieChart data={PieData} unitBasePrefix={'$'} title="Más vendidos" onDataClick={handlePointClick}/>
                </Col>
                <Col span={6}>
                    <PieChart data={PieData2} unitBasePrefix={'$'} title="Top Marketplace $" onDataClick={handlePointClick}/>
                </Col>
                <Col span={6}>
                    <PieChart data={PieData3} unitBasePrefix={'$'} title="Top Paises $" legendPosition='right' onDataClick={handlePointClick}/>
                </Col>
            </Row>
        </>
    )
}
