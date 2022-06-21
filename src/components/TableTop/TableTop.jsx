import './TableTop.css';
import Card from "../card/Card";
import CardBody from "../card/cardBody/Card/cardBody";
import CardHeader from "../card/cardHeader/Card/cardHeader";

export const TableTop = ({topData = [], range = [0, 10], title}) => {
    return (
        <Card>
            <CardHeader>
                <h3 className="card-title-custom-title" >{title}</h3>
            </CardHeader>
            <CardBody>
                <div style={{overflow: 'auto', height: "285px"}}>
                    <table>
                        <tr className="table-top-header">
                            <th>Nombre del producto - SKU</th>
                            <th>Cantidad</th>
                        </tr>
                        {topData.slice(range[0], range[1]).map(data => (
                            <tr>
                                <td>{data.name}</td>
                                <td>{data.units}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </CardBody>
        </Card>
    )
}
