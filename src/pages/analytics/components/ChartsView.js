import {Card, Col, Row} from "antd";
import BarChart from "../../../components/BarChart/BarChart";
import {BAR_CHART_DATA as barChartConfig} from "../../../services/barchart-data";
import {TableTop} from "../../../components/TableTop/TableTop";
import {TableTopData} from "../../../services/table-data";
import CardBody from "../../../components/card/cardBody/Card/cardBody";
import {PieChart} from "../../../components/PieChart/PieChart";
import {PieData, PieData2, PieData3} from "../../../services/progress-data";

export const ChartsView = () => {

    const handlePointClick = (e) => console.log(e);

    return (
        <>
            <Row>
                <Col span={15} >
                   <BarChart data={barChartConfig} xLabel="type" yLabel="sales" title="Ordenes" onDataClick={handlePointClick} />
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
