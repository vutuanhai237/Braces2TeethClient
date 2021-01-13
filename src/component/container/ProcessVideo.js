import React, { useRef, useState } from "react";
import { Col, Row, Spinner, Button, Modal } from "react-bootstrap";
import './ProcessVideo.scss';
import { eng, global } from '../../constant'
import ReactPlayer from 'react-player'
export const ProcessVideo = (props) => {
    const [currentVideo, setCurrentVideo] = useState(undefined);
    const [processedVideoURL, setProcessedVideoURL] = useState(undefined);
    const [currentVideoURL, setCurrentVideoURL] = useState(undefined);
    const [count, setCount] = useState(undefined);
    const [isModalShow, setIsModalShow] = useState(false);
    const [isGet, setIsGet] = useState(false);
    const uploadButton = useRef(null);
    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const fetchProcessedVideo = () => {
        setProcessedVideoURL(true)
    }
    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const requireProcessVideo = () => {
        setIsGet(true);
        var formdata = new FormData();
        formdata.append("file", currentVideo);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        var counttemp = 300;
        const timeinterval = setInterval(() => {
            counttemp = counttemp - 1
            setCount(counttemp)
        }, 1000)
        setIsModalShow(true);
        fetch(`${global.host}/processvideo`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setIsModalShow(false);
                clearInterval(timeinterval)
            })
            .catch(error => {
                console.log('error', error)
            });
    }


    /**
    * Get uploaded immage and set it into state
    * @param {Event} file that are from upload button
    * @return {void} 
    */
    const uploadImage = (event) => {
        setCurrentVideo(event.target.files[0])
        setCurrentVideoURL(URL.createObjectURL(event.target.files[0]))

        console.log(URL.createObjectURL(event.target.files[0]))
    }
  
    const triggerUploadButton = () => {
        uploadButton.current.click();
    }

    return (
        <div id="pageBraces2Teeth">
            <Modal size="sm" backdrop="static"
                keyboard={false} show={isModalShow} onHide={() => setIsModalShow(false)} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header style={{ justifyContent: "center" }}>
                    <Modal.Title>
                        {eng.notification}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row style={{ justifyContent: "center", marginBottom: "10px" }}>
                            <Spinner animation="grow" />
                        </Row>
                        <Row style={{ justifyContent: "center" }}> {eng.server_is_loading_model + ' ... in ' + count + 's'}
                        </Row>
                    </Col>
                </Modal.Body>
            </Modal>
            <Col>
                <Row>
                    <p id="pageTitle">{eng.braces2teethVideo + ' | ' + eng.cycleGAN}</p>
                </Row>
                <Row>
                    {currentVideoURL && <ReactPlayer controls={true} url={currentVideoURL} />}
                </Row>
                <Row>
                    <Button id="button" onClick={triggerUploadButton}>{eng.upload}</Button>
                    <input ref={uploadButton} style={{ display: "none" }} type="file" onChange={uploadImage} />
                    <Button disabled={typeof currentVideoURL === 'undefined'} id="button" onClick={requireProcessVideo}>{eng.process}</Button>
                    <Button id="button" disabled={!isGet} onClick={fetchProcessedVideo}>{eng.get}</Button>
                
                </Row>
                <Row>
                {processedVideoURL && <ReactPlayer controls={true} url={`${global.host}/processvideo`} />}

                </Row>
            </Col>
        </div>
    )
}