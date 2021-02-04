import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Col, Row, Button, Badge } from 'react-bootstrap';
import './CropImage.scss';
import { global, eng } from '../../constant'

const CropImage = ({ isReset, currentImage, parentCallback }) => {
    const defaultCrop = {
        unit: '%',
        width: 100,
        aspect: 1 / 1,
        x: 0,
        y: 0
    };
    const [src, setSrc] = useState(currentImage);
    const [imageRef, setImageRef] = useState(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [isHideCheckbox, setIsHideCheckbox] = useState(false);
    const [crop, setCrop] = useState(defaultCrop);

    useEffect(() => {
        setSrc(currentImage);
        setCrop(defaultCrop);
        setCroppedImageUrl(null);
        setIsHideCheckbox(false);
    }, [currentImage])
    const autoCenteringCanvas = () => {
        const url = src;
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'image.png', { type: 'image/png' });
                var formdata = new FormData();
                formdata.append('file', file);
                var requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                fetch(`${global.host}/detectmouth`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const intListParams = (result.split(' ')).map(e => parseInt(e))

                        let greaterAspect = intListParams[2] > intListParams[3] ? intListParams[2] : intListParams[3]
                        if (intListParams[0] + greaterAspect > intListParams[4]) {
                            greaterAspect = intListParams[4] - intListParams[0]
                        }
                        if (intListParams[1] + greaterAspect > intListParams[5]) {
                            greaterAspect = intListParams[5] - intListParams[1]
                        }

                        const cropObject = {
                            unit: 'px',
                            aspect: 1,
                            width: greaterAspect,
                            height: greaterAspect,
                            x: intListParams[0],
                            y: intListParams[1],
                        }

                        onCropChange(cropObject)
                    })
                    .catch(error => console.log('error', error));
                return false;
            })


    }

    const setAutoCentering = () => {
        onCropComplete(crop);
        setIsHideCheckbox(true);
    }
    // If you setState the crop in here you should return false.
    const onImageLoaded = (image) => {
        setImageRef(image);
        return autoCenteringCanvas();
    };


    const onCropChange = (crop) => {
        setCrop(crop);
    };

    const onCropComplete = async (crop) => {

        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.png'
            );
            setCroppedImageUrl(croppedImageUrl);
            parentCallback(croppedImageUrl);

        }
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                }
                blob.name = fileName;
                resolve(window.URL.createObjectURL(blob));
            }, 'image/png');
        });
    }


    // const { crop, croppedImageUrl, src } = this.state;
    return (
        <Col>

            <Row>
                {src && (
                    <ReactCrop
                        src={src}
                        crop={crop}
                        ruleOfThirds
                        onImageLoaded={onImageLoaded}
                        onComplete={onCropComplete}
                        onChange={onCropChange}
                    />
                )}

            </Row>
            <Row>
                {src && <p style={{marginTop: '10px', maxWidth: '256px'}}>This image must be at 1:1 scale (best at 256px x 256px)</p>}
            </Row>
            {src && !isHideCheckbox && <Row style={{ marginTop: '10px' }}>
                <Button id='button' onClick={setAutoCentering}>
                    {eng.crop} <Badge variant='light'>2</Badge>
                </Button>
            </Row>}

            <Row>
                {croppedImageUrl && (
                    <img alt='Crop' className='cropped-image' src={croppedImageUrl} />
                )}

            </Row>
        </Col>
    );

}

export default CropImage;