import React from "react";
import { Col, Row } from "react-bootstrap"
import { PAGE_BRACES2TEETH_TITLE } from '../../constant/index'
import './Braces2Teeth.scss'
import UploadImage from '../Braces2Teeth/UploadImage'
import ExcuteModel from '../Braces2Teeth/ExcuteModel'
const Braces2Teeth = (props) => {

    return (
        <div id="pageBraces2Teeth">
            <Col>
                <Row>
                    <p id="pageTitle">{PAGE_BRACES2TEETH_TITLE}</p>
                </Row>
                <Row>
                    <UploadImage />
                    <div id="verticalLine"></div>
                    <ExcuteModel />
                </Row>
            </Col>
        </div>
    )
}


export default Braces2Teeth;

