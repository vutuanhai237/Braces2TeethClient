import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Row, Col } from 'react-bootstrap';
import "./Footer.scss"
import { global, eng } from '../../constant/index'
const Footer = () => {
    const redirect = (link) => {
        window.location.href = link;
    }
    return (
        <div id="footer">
            <Row>
                <Col>
                    <div id="footerQuote"> <span> {eng.The_resonsitory_of_my_knowledges + ' @' + (new Date()).getFullYear()} </span> </div>
                </Col>
                <Col>
                    <FontAwesomeIcon id="footerLogo" icon={faGithub} onClick={() => redirect(global.github)} />
                    <FontAwesomeIcon id="footerLogo" icon={faFacebook} onClick={() => redirect(global.facebook)} />
                    <FontAwesomeIcon id="footerLogo" icon={faYoutube} onClick={() => redirect(global.youtube)} />
                    <FontAwesomeIcon id="footerLogo" icon={faLinkedin} onClick={() => redirect(global.linkedin)} />
                </Col>
            </Row>
        </div>
    );
}

export default Footer;
