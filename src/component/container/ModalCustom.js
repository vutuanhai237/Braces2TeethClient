import React from "react";
import { Spinner, Col, Row, Button, Modal } from "react-bootstrap";
import { eng } from '../../constant'
export const ModalCustom = ({isShow, title, variant, content, onHide, onClick, isShowFooter }) => {
    return (
        <Modal size="sm" backdrop="static"
                keyboard={false} show={isShow} onHide={onHide} aria-labelledby="example-modal-sizes-title-sm">
                <Modal.Header style={{ justifyContent: "center" }}>
                    <Modal.Title>
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Col>
                        <Row style={{ justifyContent: "center", marginBottom: "10px" }}>
                            <Spinner animation="grow" variant={variant} />
                        </Row>
                        <Row style={{ justifyContent: "center" }}> {content}
                        </Row>
                    </Col>
                </Modal.Body>
                <Modal.Footer style={isShowFooter === false ? { display: "none" } : {}}>
                    <Button onClick={onClick} id="button">{eng.ok}</Button>
                </Modal.Footer>
            </Modal>
    )
}
