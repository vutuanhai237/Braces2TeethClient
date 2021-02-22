import React, { useRef, useState } from 'react';
import { Col, Row, Button, Badge } from 'react-bootstrap';
import './ProcessVideo.scss';
import { eng, global } from '../../constant'
import ReactPlayer from 'react-player'
import { ModalCustom } from './ModalCustom'
export const ProcessVideo = (props) => {
    const [currentVideo, setCurrentVideo] = useState(undefined);
    const [processedVideoURL, setProcessedVideoURL] = useState(false);
    const [currentVideoURL, setCurrentVideoURL] = useState(undefined);
    const [count, setCount] = useState(100);
    const [isModalShow, setIsModalShow] = useState(false);
    const [contentModal, setContentModal] = useState('');
    const [titleModal, setTitleModal] = useState('');
    const [isGet, setIsGet] = useState(false);
    const uploadButton = useRef(null);
    const getButton = useRef(null);
    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const fetchConcatVideo = () => {
        setProcessedVideoURL(true)
    }

    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const requireProcessVideo = () => {
        setIsGet(true);
        var formdata = new FormData();
        formdata.append('file', currentVideo);
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
        setTitleModal(eng.notification);
        setIsModalShow(true);
        fetch(`${global.host}/processvideo`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setIsModalShow(false);
                clearInterval(timeinterval);
                getButton.current.click();
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
    const uploadVideo = (event) => {
        const file = event.target.files[0];
        const extensionType = ['mp4']
        const fileType = file.name.split('.')[file.name.split('.').length - 1];
        if (extensionType.includes(fileType)) {
            setCurrentVideo(file)
            setCurrentVideoURL(URL.createObjectURL(file))
        } else {
            setTitleModal(eng.alert);
            setIsModalShow(true);
            setContentModal('Please upload mp4 file!');
        }

    }

    const triggerUploadButton = () => {
        uploadButton.current.click();
    }

    return (
        <div id='pageBraces2Teeth'>
            <ModalCustom
                isShow={isModalShow}
                title={titleModal}
                variant={titleModal === eng.alert ? 'danger' : 'success'}
                content={titleModal === eng.alert ? contentModal : eng.server_is_loading_model + ' in ' + count + 's ...'}
                onHide={() => setIsModalShow(false)}
                onClick={() => setIsModalShow(false)}
                isShowFooter={titleModal === eng.alert ? true : false}>
            </ModalCustom>

            <Col>
                <Row>
                    <p id='pageTitle'>{eng.braces2teeth_video}</p>
                </Row>
                <Row>
                    {currentVideoURL && <ReactPlayer style={{ marginBottom: '20px' }} controls={true} url={currentVideoURL} />}
                </Row>
                <Row>
                    <Button id='button' onClick={triggerUploadButton}>
                        {eng.upload} <Badge variant='light'>1</Badge>
                    </Button>
                    <input ref={uploadButton} style={{ display: 'none' }} type='file' onChange={uploadVideo} />
                    <Button disabled={typeof currentVideoURL === 'undefined'} id='button' onClick={requireProcessVideo}>
                        {eng.process} <Badge variant='light'>2</Badge>
                    </Button>
                    <Button ref={getButton} style={{ display: 'none' }} variant='success' id='button' disabled={!isGet} onClick={fetchConcatVideo}>
                        {eng.get} <Badge variant='light'>3</Badge>
                    </Button>

                </Row>
                {processedVideoURL && <Col style={{ paddingLeft: '0px' }}>
                    <Row><p className='margin-bottom-0'>{eng.concat_video}</p></Row>
                    <Row><ReactPlayer controls={true} url={`${global.host}/processvideo`} />
                    </Row>
                    <Row>
                        <p className='margin-top-10'>{eng.processed_video}</p>
                    </Row>
                    <Row>
                        <ReactPlayer controls={true} url={`${global.host}/processoriginvideo`} />
                    </Row>

                </Col>}
            </Col>
        </div>
    )
}