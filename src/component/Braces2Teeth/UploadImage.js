import React, { useState, useRef } from "react";
import { Col, Row, Button } from "react-bootstrap"
import "./UploadImage.scss"
import example from '../../img/example.png'
import { COMPONENT_UPLOADIMAGE_DELETE_BUTTON } from "../../constant/index"
const UploadImage = (props) => {
    const [uploadedImage, setUploadedImage] = useState(example);
    const uploadButton = useRef(null);
    const uploadImage = (e) => {
        console.log(e.target.files[0]);
        setUploadedImage(URL.createObjectURL(e.target.files[0]));
       
    }
    const triggerUploadButton = () => {
        uploadButton.current.click();
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
                    <div onClick={triggerUploadButton}><p id="link">Upload</p></div>
                    <p style={{ marginLeft: "6px" }}>your image or</p>
                    <div style={{ marginLeft: "6px" }} onClick={pickRandom} id="link" ><p>pick</p></div>
                    <p style={{ marginLeft: "6px" }}> a random brace</p>
                </Row>
                <Row>
                    <img alt="" src={uploadedImage} width="256" height="256" className="d-inline-block align-top" />
                </Row>
                <Row>
                    <Button id="button" onClick={deleteImage}>{COMPONENT_UPLOADIMAGE_DELETE_BUTTON}</Button>
                    <input ref={uploadButton} style={{display: "none"}}type="file" onChange={uploadImage} />
                </Row>
            </Col>
        </div>
    )
}


export default UploadImage;

