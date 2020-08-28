import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap"
import "./UploadImage.scss"
import { 
    COMPONENT_UPLOADIMAGE_DELETE_BUTTON, 
    BRACES2TEETH_UPLOADED_IMAGE_ACTION 
} from "../../constant/index"
import example_0 from '../../img/example/example_0.png'
import example_1 from '../../img/example/example_1.png'
import example_2 from '../../img/example/example_2.png'
import example_3 from '../../img/example/example_3.png'
import example_4 from '../../img/example/example_4.png'
import { useDispatch } from "react-redux";
const UploadImage = (props) => {
    const dispatch = useDispatch();
    const randomImage = () => {
        const images = [example_0, example_1, example_2, example_3, example_4]
        return images[Math.floor(Math.random() * images.length)];
    }
    const dispatchImage = () => {
        dispatch({
            type: BRACES2TEETH_UPLOADED_IMAGE_ACTION,
            payload: {
                uploadedImage: uploadedImage
            }
        })
    }
    const visibleStyle = {
        display: "block",
    }
    const hiddenStyle = {
        display: "none",
    }
    
    var example = randomImage();
    const [uploadedImage, setUploadedImage] = useState(example); dispatchImage()
    const [hideImage, setHideImage] = useState(visibleStyle); // none or block
    const uploadButton = useRef(null);
    const randomButton = useRef(null);
    
    
    const uploadImage = (e) => {
        console.log(e.target.files[0]);
        setUploadedImage(URL.createObjectURL(e.target.files[0]));
        setHideImage(visibleStyle)
        dispatchImage()
    }

    const pickRandom = () => {
        example = randomImage();
        setUploadedImage(example);
        setHideImage(visibleStyle)
        dispatchImage()
    }

    const triggerUploadButton = () => {
        uploadButton.current.click();
    }

    const triggerRandomButton = () => {
        randomButton.current.click();
    }

    const deleteImage = () => {
        setHideImage(hiddenStyle)
    }
   
    
    return (
        <div id="componentUploadImage">
            <Col>
                <Row>
                    <div onClick={triggerUploadButton}><p id="link">Upload</p></div>
                    <p style={{ marginLeft: "6px" }}>your image or</p>
                    <div style={{ marginLeft: "6px" }} onClick={triggerRandomButton} id="link" ><p>pick</p></div>
                    <p style={{ marginLeft: "6px" }}> a random brace</p>
                </Row>
                <Row>
                    <img style={hideImage} alt="" src={uploadedImage} width="256" height="256" />
                </Row>
                <Row>
                    <Button style={hideImage} id="button" onClick={deleteImage}>{COMPONENT_UPLOADIMAGE_DELETE_BUTTON}</Button>
                    <input ref={uploadButton} style={{ display: "none" }} type="file" onChange={uploadImage} />
                    <Button ref={randomButton} style={{ display: "none" }} onClick={pickRandom}/>
                </Row>
            </Col>
        </div>
    )
}


export default UploadImage;

