import Card from "../card/Card";
import CardHeader from "../card/cardHeader/Card/cardHeader";
import CardBody from "../card/cardBody/Card/cardBody";
import './Indicator.css'

export const Indicator = ({value = 0, title = 'Indicator Title', suffix = '', prefix = ''}) => {
    return (
        <div className="indicator">
            <Card style={{paddingBottom: 0}}>
                <CardHeader>
                    <h1 className="indicator-title">{title}</h1>
                </CardHeader>
                <CardBody>
                    <h2 className="indicator-value">{`${prefix}${value}${suffix}`}</h2>
                </CardBody>
            </Card>
        </div>
    )
}
