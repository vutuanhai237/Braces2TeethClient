import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Button, Form, Overlay, Tooltip } from "react-bootstrap"
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import "./GroupButton.scss"
import {
    MODEL_CYCLEGAN, MODEL_WGANGP,
    COMPONENT_GROUPBUTTON_TICK_BRACES_BUTTON,
    COMPONENT_GROUPBUTTON_TICK_NOT_BRACES_BUTTON,
    COMPONENT_GROUPBUTTON_CLEAR_BUTTON,
    COMPONENT_GROUPBUTTON_EXCUTE_BUTTON,
    COMPONENT_GROUPBUTTON_CANVA_LABEL,
    COMPONENT_GROUPBUTTON_OVERLAY_LABEL
} from "../../constant/index"
const GroupButton = (props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setOverlay(false);
        }, 3000);
    });

    const { uploadedImage, selectedModel } = props;
    const [overlay, setOverlay] = useState(false);
    const targetOverlay = useRef(null);
    const getStyleCanva = () => {
        if (selectedModel === MODEL_CYCLEGAN) {
            return {
                display: "none",
            }
        }
        return {
            display: "flex",
        }
    }
    const tickBraces = () => {

    }

    const tickNotBraces = () => {

    }

    const clear = () => {

    }

    const excute = () => {

        if (selectedModel !== MODEL_CYCLEGAN && selectedModel !== MODEL_WGANGP) {
            setOverlay(true)
        }
    }

    return (

        <div id="componentGroupButton">
            <Col>
                <Row style={getStyleCanva()}>
                    <p>{COMPONENT_GROUPBUTTON_CANVA_LABEL}</p>
                </Row>
                <Row style={getStyleCanva()}>
                    <Button variant="info" id="circelButton" onClick={tickBraces}></Button>
                    <p id="textRightCircleButton">{COMPONENT_GROUPBUTTON_TICK_BRACES_BUTTON}</p>
                </Row>
                <Row style={getStyleCanva()}>
                    <Button variant="danger" id="circelButton" onClick={tickBraces}></Button>
                    <p id="textRightCircleButton">{COMPONENT_GROUPBUTTON_TICK_NOT_BRACES_BUTTON}</p>

                </Row>
                <Row style={getStyleCanva()}>
                    <Button id="button" onClick={clear}>{COMPONENT_GROUPBUTTON_CLEAR_BUTTON}</Button>

                </Row>
                <Row>
                    <Button ref={targetOverlay} style={{ marginTop: "0px" }} id="button" onClick={excute}>{COMPONENT_GROUPBUTTON_EXCUTE_BUTTON}</Button>
                </Row>
                <Overlay target={targetOverlay.current} show={overlay} placement="right">
                    {(props) => (
                        <Tooltip id="overlay" {...props}>
                            {COMPONENT_GROUPBUTTON_OVERLAY_LABEL}
                        </Tooltip>
                    )}
                </Overlay>
            </Col>
        </div>
    )
}

const mapStatetoProps = (state) => {
    const { braces2teeth } = state
    return {
        selectedModel: braces2teeth.selectedModel,
        uploadedImage: braces2teeth.uploadedImage,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(GroupButton));

