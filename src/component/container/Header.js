import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import leoIcon from '../../img/leoIcon.ico'
import './Header.scss'
import { eng } from '../../constant/index'
const Header = (props) => {

    return (
        <div id="header">
            <Navbar className="navbar justify-content-between" bg="white" expand="md">
                <Navbar.Brand id='headerBrand' href="/">
                    <img alt="" src={leoIcon} width="30" height="30" className="d-inline-block align-top" />
                    &nbsp;&nbsp;{eng.braces2teeth}
                </Navbar.Brand>
               
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="justify-content-center">
                        {/* Menu */}
                        <Nav.Link className="menu-item" href="/process">
                            {eng.braces2teeth}
                        </Nav.Link>
                        <Nav.Link className="menu-item" href="/processvideo">
                            {eng.braces2teeth_video}
                        </Nav.Link>
                        <Nav.Link className="menu-item" href="/research">
                            {eng.research_notebook}
                        </Nav.Link>
                        <Nav.Link className="menu-item" href="/life">
                            {eng.life_notebook}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <hr></hr>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);

