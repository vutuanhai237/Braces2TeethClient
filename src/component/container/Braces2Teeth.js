import React, { useEffect, useRef, useState } from 'react';
import { Col, Row, Button, Badge } from 'react-bootstrap';
import './Braces2Teeth.scss';
import { eng } from '../../constant/index';
import Webcam from 'react-webcam';
import CropImage from './CropImage'
import { global } from '../../constant'
import {ModalCustom} from './ModalCustom'
export const Braces2Teeth = (props) => {
    const [mode, setMode] = useState('upload')
    const [currentImage, setCurrentImage] = useState(undefined);
    const [currentImageFile, setCurrentImageFile] = useState(undefined);
    const [currentProcessedImageFile, setCurrentProcessedImageFile] = useState(undefined);
    const [processedImageBase64, setProcessedImageBase64] = useState();
    const [count, setCount] = useState(30);
    const [isModalShow, setIsModalShow] = useState(false);
    const [contentModal, setContentModal] = useState('');
    const [titleModal, setTitleModal] = useState('');

    const uploadButton = useRef(null);

    const webcamRef = React.useRef(null);

    const capture = React.useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCurrentImage(imageSrc);
        setMode('upload');
    }, []);

    useEffect(() => {
        //getFileFromBase64(currentImage, setCurrentImageFile)
    }, [currentImage])
    /**
    * Callback function for CropImage component
    * @param {string} url
    * @return {void} 
    */
    const updateCroppedImage = (imgURL) => {
        getFileFromBase64(imgURL, setCurrentImageFile)
    }
    /**
    * Get processed image from flask server and set it into state
    * @return {void} 
    */
    const fetchProcessedImage = () => {
        setTitleModal(eng.notification);
        setIsModalShow(true);
        var formdata = new FormData();
        formdata.append('file', currentImageFile);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        var counttemp = 30;
        const timeinterval = setInterval(() => {
            counttemp = counttemp - 1
            setCount(counttemp)
        }, 1000)
        fetch(`${global.host}/process`, requestOptions)
            .then(response => response.text())
            .then(result => {
                setIsModalShow(false);
                setProcessedImageBase64(`data:image/png;base64,${result}`);
                getFileFromBase64(`data:image/png;base64,${result}`, setCurrentProcessedImageFile)
                clearInterval(timeinterval)
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
                const file = new File([blob], 'image.png', { type: 'image/png' });
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
        try {
            const file = event.target.files[0];
            const extensionType = ['jpg', 'jpeg', 'png']
            const fileType = file.name.split('.')[file.name.split('.').length - 1];
            if (extensionType.includes(fileType)) {
                getBase64(file).then(data => {
                    setCurrentImage(data);
                    
                });
                setProcessedImageBase64(undefined)
            } else {
                setIsModalShow(true);
                setTitleModal(eng.alert);
                setContentModal('Please upload jpg, png or jpeg file!');
            }
        } catch (e) {

        }
      
    }

    const changeMode = (mode) => {
        setCurrentImage(undefined);
        setCurrentImageFile(undefined);
        setProcessedImageBase64(undefined);
        setMode(mode);
    }

    const triggerUploadButton = () => {
        uploadButton.current.click();
    }
    const UploadComponent = () => {
        return <Col>

            <Row>
                {/* {currentImage && <img id='image' alt='' src={currentImage} />} */}
            </Row>
            <Row>
                <Button id='button' onClick={triggerUploadButton}>
                    {eng.upload} <Badge variant='light'>1</Badge>
                </Button>
                <input ref={uploadButton} style={{ display: 'none' }} type='file' onChange={uploadImage} />
                <Button disabled={typeof currentImage === 'undefined' || typeof currentImageFile === 'undefined'} id='button' onClick={fetchProcessedImage}>
                    {eng.process } <Badge variant='light'>3</Badge>
                </Button>
            </Row>
        </Col>
    }

    const WebcamComponent = () => {
        return <Col>
            <Row>
                <Webcam className='mirror-effect' audio={false} ref={webcamRef} screenshotFormat='image/png' />
            </Row>
            <Row>
                {currentImage && <p style={{ marginTop: '12px' }}>Your image </p>}
            </Row>
            <Row>
                {currentImage && <img id='image' className='mirror-effect' alt='' src={currentImage} />}
            </Row>
            <Row>
                <Button id='button' onClick={capture}>
                    {eng.capture} <Badge variant='light'>1</Badge>
                </Button>
  
            </Row>
        </Col>
    }


    return (
        <div id='pageBraces2Teeth'>
            <ModalCustom 
                isShow={isModalShow} 
                title={titleModal} 
                variant={titleModal === eng.alert ? 'danger' : 'success'}
                content={titleModal === eng.alert ? contentModal : eng.server_is_loading_model + ' in ' + count + 's ...'}
                onHide={()=>setIsModalShow(false)}
                onClick={()=>setIsModalShow(false)}
                isShowFooter={titleModal === eng.alert ? true: false}>    
            </ModalCustom>
            <Col>
                <Row>
                    <p id='pageTitle'>{eng.braces2teeth}</p>
                </Row>
                <Row>
                    <div id='componentUploadImage'>
                        <Col>
                            <Row>
                                <div onClick={() => changeMode('upload')}><p id='link'>{eng.upload}&nbsp;</p></div>
                                <p>{eng.your_image_or}&nbsp;</p>
                                <div onClick={() => changeMode('webcam')} id='link' ><p>{eng.take_a_shot}</p></div>
                            </Row>
                        </Col>
                        <CropImage isReset={typeof currentImage === 'undefined' ? true : false} parentCallback={(img) => updateCroppedImage(img)} currentImage={currentImage} />
                        {mode === 'upload' ? UploadComponent() : WebcamComponent()}
                    </div>
                    {currentImage && <div id='verticalLine'></div>}
                    {processedImageBase64 && <div id='componentExcuteModel'>
                        <Col>
                            <Row>
                                <p style={{fontWeight: 'bold'}}>{eng.processed_image}</p>
                            </Row>
                            <Row>
                                <img id='image' alt='' src={processedImageBase64} className='d-inline-block align-top' />
                            </Row>
                            <Row>
                                {currentProcessedImageFile && <Button style={{width: '160px'}} id='button' href={URL.createObjectURL(currentProcessedImageFile)} download>
                                    {eng.download} <Badge variant='light'>3</Badge>
                                </Button>}

                            </Row>
                        </Col>

                        <div id='verticalLine'></div>
                    </div>}
                </Row>

            </Col>
        </div>
    )
}


