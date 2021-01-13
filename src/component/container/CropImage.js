import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Col, Row } from "react-bootstrap";
import './CropImage.scss';

const CropImage = ({currentImage, parentCallback}) => {
    const [src, setSrc] = useState(currentImage);
    const [imageRef, setImageRef] = useState();
    const [croppedImageUrl, setCroppedImageUrl] = useState(null);
    const [crop, setCrop] = useState({
        unit: '%',
        width: 30,
        aspect: 1 / 1
    });

    useEffect(() => {
        setSrc(currentImage)
    }, [currentImage])

    // If you setState the crop in here you should return false.
    const onImageLoaded = (image) => {
        setImageRef(image);
    };

    const onCropComplete = (crop) => {
        makeClientCrop(crop);
    };

    const onCropChange = (crop, percentCrop) => {
        // You could also use percentCrop:
        // this.setState({ crop: percentCrop });
        setCrop(crop);
    };

    const makeClientCrop = async (crop) => {
        if (imageRef && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imageRef,
                crop,
                'newFile.png'
            );
            setCroppedImageUrl(croppedImageUrl);
            parentCallback(croppedImageUrl);
            //props.parentCallBack(croppedImageUrl)
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
                {src && <p>This image must be at 1:1 scale (best at 256px x 256px)</p>}
            </Row>
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
                {src && <hr></hr>}
            <Row>
                {croppedImageUrl && (
                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                )}

            </Row>

        </Col>
    );

}

export default CropImage;