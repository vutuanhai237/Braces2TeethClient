import React, { useEffect, useRef, useState } from "react";
import { Col, Row, Form, Spinner, Button, Modal } from "react-bootstrap";
import './Braces2Teeth.scss';
import { eng } from "../../constant/index";
import Webcam from "react-webcam";
export const Braces2Teeth = (props) => {
    const [mode, setMode] = useState('upload')
    const [currentImage, setCurrentImage] = useState(undefined);
    const [currentImageFile, setCurrentImageFile] = useState(undefined);
    const [currentProcessedImageFile, setCurrentProcessedImageFile] = useState(undefined);
    const [processedImageBase64, setProcessedImageBase64] = useState();
    const [isModalShow, setIsModalShow] = useState(false);
    const uploadButton = useRef(null);

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCurrentImage(imageSrc);
    }, []);

    useEffect(() => {
        getFileFromBase64(currentImage, setCurrentImageFile)
    }, [currentImage])

    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const fetchProcessedImage = () => {
        setIsModalShow(true);
        var formdata = new FormData();
        formdata.append("file", currentImageFile);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:6868/predict", requestOptions)
            .then(response => response.text())
            .then(result => {
                setIsModalShow(false);
                setProcessedImageBase64(`data:image/png;base64,${result}`);
                getFileFromBase64(`data:image/png;base64,${result}`, setCurrentProcessedImageFile)
            })
            .catch(error => {
                console.log('error', error)
            });
    }

    /**
     * Convert an image to file and set it into any state
     * @param {blob} base64 image under base64 format
     * @param {callback} callback setState function 
     * @return {Promise} async function
     */
    const getFileFromBase64 = (base64, callback) => {
        const url = base64;
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "image.png", { type: "image/png" });
                callback(file)
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
        getBase64(event.target.files[0]).then(data => {
            setCurrentImage(data);
        });
        //setCurrentImageFile(event.target.files[0])
    }

    const changeMode = (mode) => {
        setCurrentImage(undefined);
        setProcessedImageBase64(undefined);
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
                <Button disabled={typeof currentImage === 'undefined'} id="button" onClick={fetchProcessedImage}>{eng.process}</Button>
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
                <Button disabled={typeof currentImage === 'undefined'} id="button" onClick={fetchProcessedImage}>{eng.process}</Button>

            </Row>
        </Col>
    }


    return (
        <div id="pageBraces2Teeth">
            <Modal size="sm" backdrop="static"
                keyboard={false} show={isModalShow} onHide={() => setIsModalShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header style={{ justifyContent: "center"}}>
                    <Modal.Title>
                        {eng.notification}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row style={{ justifyContent: "center", marginBottom: "10px" }}>
                            <Spinner animation="grow" />
                        </Row>
                        <Row style={{ justifyContent: "center"}}> {eng.server_is_loading_model + ' ...'}
                        </Row>
                    </Col>
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
                                <div onClick={() => changeMode('upload')}><p id="link">{eng.upload}&nbsp;</p></div>
                                <p>{eng.your_image_or}&nbsp;</p>
                                <div onClick={() => changeMode('webcam')} id="link" ><p>take from Webcam</p></div>
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
                            <Row>
                                {currentProcessedImageFile && <Button id="button" href={URL.createObjectURL(currentProcessedImageFile)} download>{eng.download}</Button>}

                            </Row>
                        </Col>

                        <div id="verticalLine"></div>
                    </div>}
                </Row>

            </Col>
        </div>
    )
}




