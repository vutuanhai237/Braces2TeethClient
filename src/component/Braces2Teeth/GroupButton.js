import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap"

import "./GroupButton.scss"
import {
    COMPONENT_GROUPBUTTON_TICK_BRACES_BUTTON,
    COMPONENT_GROUPBUTTON_TICK_NOT_BRACES_BUTTON,
    COMPONENT_GROUPBUTTON_CLEAR_BUTTON,
    COMPONENT_GROUPBUTTON_EXCUTE_BUTTON,
} from "../../constant/index"
const GroupButton = (props) => {
    const tickBraces = () => {

    }

    const tickNotBraces = () => {

    }

    const clear = () => {

    }

    const excute = () => {

    }
    return (
        <div id="componentGroupButton">

            <Col>
            
                <Row>
                    <Button id="button" onClick={tickBraces}>{COMPONENT_GROUPBUTTON_TICK_BRACES_BUTTON}</Button>

                </Row>
                <Row>
                    <Button id="button" onClick={tickNotBraces}>{COMPONENT_GROUPBUTTON_TICK_NOT_BRACES_BUTTON}</Button>

                </Row>
                <Row>
                    <Button id="button" onClick={clear}>{COMPONENT_GROUPBUTTON_CLEAR_BUTTON}</Button>

                </Row>
                <Row>
                    <Button id="button" onClick={excute}>{COMPONENT_GROUPBUTTON_EXCUTE_BUTTON}</Button>
                </Row>
            </Col>
        </div>
    )
}


export default GroupButton;

