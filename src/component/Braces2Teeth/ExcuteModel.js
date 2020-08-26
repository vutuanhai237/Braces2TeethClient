import React, { useState } from "react";
import { Col, Row, Button, Form } from "react-bootstrap"
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import "./ExcuteModel.scss"
import example from '../../img/example.png'
import { setSelectedModel } from '../../service/Braces2TeethService'
import { MODEL_CYCLEGAN, MODEL_WGANGP } from '../../constant/index'
const ExcuteModel = (props) => {
    const [selectedModel, setSelectedModel] = useState("");
    const changeSelectedModel = (model) => {
        setSelectedModel(model);
    }


    return (
        <div id="componentExcuteModel">
            <Col>
                <Row>
                    <Col style={{ paddingLeft: "0px" }}><p> Select model</p></Col>
                    <Col>
                        <Form.Group as={Row}>
                            <fieldset>
                                <Col><Form.Check onChange={()=> changeSelectedModel(MODEL_CYCLEGAN)} type="radio" label={MODEL_CYCLEGAN} name="radio" id="radioCycleGAN" /></Col>
                                <Col><Form.Check onChange={()=> changeSelectedModel(MODEL_WGANGP)} type="radio" label={MODEL_WGANGP} name="radio" id="radioWGAN-GP" /></Col>
                            </fieldset>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <img alt="" src={example} width="256" height="256" className="d-inline-block align-top" />
                </Row>

            </Col>

        </div>
    )
}

const mapStatetoProps = (state) => {
    return {
        image: state.braces2teeth.image,
        selectedModel: state.braces2teeth.selectedModel,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    setSelectedModel,

}, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ExcuteModel));

