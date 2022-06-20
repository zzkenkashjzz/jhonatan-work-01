import React from "react";
import Card from "../../card/Card";
import CardHeader from "../../card/cardHeader/Card/cardHeader";
import CardBody from "../../card/cardBody/Card/cardBody";
import './WelcomeLayout.css'

const WelcomeLayout = ({title,subTitle, ResearchIcon}) => (
    <Card>
        <CardHeader>
            <div className="align-end oblique_font">
                {'Ultima Actualizacion Hoy a 12:22 PM  '}
                <div className="researcher"><ResearchIcon/></div>
            </div>
        </CardHeader>
        <CardBody>
            <div>
                <h1 className="oblique_font">{title}</h1>
                <span className="oblique_font">{subTitle}</span>
            </div>
        </CardBody>
    </Card>
)

export default WelcomeLayout;
