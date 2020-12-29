import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Form, Button, Modal } from "react-bootstrap";
import './Braces2Teeth.scss';
import { eng } from "../../constant/index";
import Webcam from "react-webcam";
export const Braces2Teeth = (props) => {
    const [mode, setMode] = useState('upload')
    const [currentImage, setCurrentImage] = useState(undefined);
    const [currentImageFile, setCurrentImageFile] = useState(undefined);
    const [processedImageBase64, setProcessedImageBase64] = useState();
    const [isModalShow, setIsModalShow] = useState(false);
    const uploadButton = useRef(null);

    const webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCurrentImage(imageSrc);
    }, [webcamRef, setImgSrc]);

    useEffect(() => {
        getFileFromBase64(currentImage)
    }, [currentImage])

    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const fetchProcessedImage = () => {
        setIsModalShow(true);
        var formdata = new FormData();
        console.log(currentImageFile)
        formdata.append("file", currentImageFile);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:6868/predict", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setIsModalShow(false);
                setProcessedImageBase64(`data:image/png;base64,${result}`);
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    const getFileFromBase64 = (base64) => {
        const url = base64;
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "image.png", { type: "image/png" });
                setCurrentImageFile(file)
                return file;
            })
    }
    const getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    /**
    * Get uploaded immage and set it into state
    * @param {Event} file that are from upload button
    * @return {void} 
    */
    const uploadImage = (event) => {
        console.log("FILE");
        getBase64(event.target.files[0]).then(data => {
            setCurrentImage(data);
        });
        //setCurrentImageFile(event.target.files[0])
    }

    const changeMode = (mode) => {
        setCurrentImage(null);
        setMode(mode);
    }

    const triggerUploadButton = () => {
        uploadButton.current.click();
    }
    const UploadComponent = () => {
        return <Col>

            <Row>
                {currentImage && <img id="image" alt="" src={currentImage} />}
            </Row>
            <Row>
                <Button id="button" onClick={triggerUploadButton}>{eng.upload}</Button>
                <input ref={uploadButton} style={{ display: "none" }} type="file" onChange={uploadImage} />
                <Button id="button" onClick={fetchProcessedImage}>{eng.process}</Button>
            </Row>
        </Col>
    }

    const WebcamComponent = () => {
        return <Col>
            <Row>
                <Webcam className="mirror-effect" audio={false} ref={webcamRef} screenshotFormat="image/png" />
            </Row>
            <Row>
                {currentImage && <p style={{ marginTop: '12px' }}>Your image </p>}
            </Row>
            <Row>

                {currentImage && <img id="image" className="mirror-effect" alt="" src={currentImage} />}
            </Row>

            <Row>
                <Button id="button" onClick={capture}>{eng.capture}</Button>
                <Button id="button" onClick={fetchProcessedImage}>{eng.process}</Button>

            </Row>
        </Col>
    }


    return (
        <div id="pageBraces2Teeth">
            <Modal size="sm" backdrop="static"
                keyboard={false} show={isModalShow} onHide={() => setIsModalShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header>
                    <Modal.Title>
                        {eng.notification}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {eng.server_is_loading_model + ' ...'}
                </Modal.Body>
            </Modal>
            <Col>
                <Row>
                    <p id="pageTitle">{eng.braces2teeth + ' | ' + eng.cycleGAN}</p>
                </Row>
                <Row>
                    <div id="componentUploadImage">
                        <Col>
                            <Row>
                                <div onClick={() => changeMode('upload')}><p id="link">Upload</p></div>
                                <p style={{ marginLeft: "6px" }}>your image or</p>
                                <div style={{ marginLeft: "6px" }} onClick={() => changeMode('webcam')} id="link" ><p>take from Webcam</p></div>
                            </Row>
                        </Col>


                        {mode === 'upload' ? UploadComponent() : WebcamComponent()}
                    </div>
                    {currentImage && <div id="verticalLine"></div>}
                    {processedImageBase64 && <div id="componentExcuteModel">
                        <Col>
                            {/* <Row>
                                <Col style={{ paddingLeft: "0px" }}><p>{eng.select_model}</p></Col>
                                <Col>
                                    <Form.Group as={Row}>
                                        <fieldset>
                                            <Col><Form.Check onChange={() => setCurrentImage(eng.cycleGAN)} type="radio" label={eng.cycleGAN} name="radio" id="radioCycleGAN" /></Col>
                                            <Col><Form.Check onChange={() => setCurrentImage(eng.pix2pix)} type="radio" label={eng.pix2pix} name="radio" id="radioPix2Pix" /></Col>
                                        </fieldset>
                                    </Form.Group>
                                </Col>
                            </Row> */}
                             <Row>
                                <p>{eng.processed_image}</p>
                            </Row>
                            <Row>
                                <img id="image" alt="" src={processedImageBase64} className="d-inline-block align-top" />
                            </Row>
                        </Col>
                        
                    <div id="verticalLine"></div>
                    </div>}
                </Row>

            </Col>
        </div>
    )
}




