import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap"

import "./ExcuteModel.scss"
import example from '../../img/example.png'
import { COMPONENT_UPLOADIMAGE_DELETE_BUTTON } from "../../constant/index"
const ExcuteModel = (props) => {
    const [radioButton, setRadioButton] = useState(0);
    const onClick = (nr) => () => {
        setRadioButton(nr)
    }

    const deleteImage = () => {
        alert(1)
    }

    return (
        <div id="componentExcuteModel">
            <Col>
                <Row>
                    <Col style={{ paddingLeft: "0px" }}><p> Select model</p></Col>
                    <Col>
                   
                        <fieldset>
                        <Row><Form.Check type="radio" label="CycleGAN" name="radio" id="radioCycleGAN" /></Row>
                        <Row><Form.Check type="radio" label="WGAN - GP" name="radio" id="radioWGAN-GP" /></Row>

                        </fieldset>
                    </Col>

                </Row>
                <Row>
                    <img alt="" src={example} width="256" height="256" className="d-inline-block align-top" />
                </Row>
                <Row>
                    <Button id="button" onClick={deleteImage}>{COMPONENT_UPLOADIMAGE_DELETE_BUTTON}</Button>
                </Row>
            </Col>
        </div>
    )
}


export default ExcuteModel;

