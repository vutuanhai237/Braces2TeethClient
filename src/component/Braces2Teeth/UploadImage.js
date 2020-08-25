import React from "react";
import { Col, Row, Button } from "react-bootstrap"
import "./UploadImage.scss"
import example from '../../img/example.png'
import { COMPONENT_UPLOADIMAGE_DELETE_BUTTON } from "../../constant/index"
const UploadImage = (props) => {
    const upload = () => {
        alert(1)
    }

    const pickRandom = () => {
        alert(1)
    }

    const deleteImage = () => {
        alert(1)
    }

    return (
        <div id="componentUploadImage">
            <Col>
                <Row>
                    <div onClick={upload}><p id="link">Upload</p></div>
                    <p style={{ marginLeft: "6px" }}>your image or</p>
                    <div style={{ marginLeft: "6px" }} onClick={pickRandom} id="link" ><p>pick</p></div>
                    <p style={{ marginLeft: "6px" }}> a random brace</p>
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


export default UploadImage;

