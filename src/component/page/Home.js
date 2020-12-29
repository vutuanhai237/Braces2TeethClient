import React, { Component, useEffect } from "react";
import Header from "../container/Header"
import Footer from "../container/Footer"
import { Braces2Teeth } from "../container/Braces2Teeth"
const Home = (props) => {
    return (
        <div>
            <Header />
            <Braces2Teeth />
            <Footer />
        </div>
    );

}

export default Home;
