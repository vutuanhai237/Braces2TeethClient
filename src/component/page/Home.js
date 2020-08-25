import React, { Component } from "react";
import Header from "../container/Header"
import Footer from "../container/Footer"
import Braces2Teeth from "../container/Braces2Teeth"
class Home extends Component {
    render() {
        return (
            <div>
               <Header/>
               <Braces2Teeth/>
               <Footer/>
            </div>
        );
    }
}

export default Home;
