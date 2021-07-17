import React, { Component } from 'react'
import Breadcrumbs from './Breadcrumbs'
import Logo from '../images/logo.png'
import SearchIcon from '../images/105498-200.png'
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    constructor(props) {
        super(props);
        this.adjustFontSize = this.adjustFontSize.bind(this);
        }
        
        state = {
            size: 0,
            search: false,
        }

        // Search Overlay Visibility Control
        showSearch = () => {

            const input = document.getElementById('gsc-i-id1');

            this.setState(prevState => ({
                search: !prevState.search
            }));
            if (this.state.search === false) {
                input.focus();
                input.select();
            } else {
                input.blur();
            }
        }

        // Font Adjustment Control
        adjustFontSize = () => {
            this.setState({
              size:this.state.size+1  
             })
             
             if (this.state.size === 1) {
                this.setState({
                    size: 0
                   })
             };
             
             this.setFontSize();
        }

        setFontSize(){
            switch(this.state.size){
                default: document.body.style.fontSize="110%";
                break;
                case 0: document.body.style.fontSize="130%";
                break;
                case 1: document.body.style.fontSize="160%";
            }
        }

    render() {
        return (
            <nav>
                <div className="layer">
                    <Link to ={'/'} onClick={this.state.search ? this.showSearch : console.log()}>
                        <img src={Logo} className="logo" alt="Camrose Seniors Coalition"></img>
                    </Link>
                    <div className="search">
                        <img id="showSearchIcon" alt="Search" onClick={this.showSearch} src={SearchIcon} className={`searchIcon ${this.state.search ? "hidden" : "visible"}`}></img>
                        <div id="hideSearchIcon" onClick={this.showSearch} className={`searchIcon ${this.state.search ? "visible" : "hidden"}`}>X</div>
                    </div>
                </div> 
                <div className="layer" style={{backgroundImage: `linear-gradient(to right, #E4E4E4, ${this.props.theme})`}}>
                    <Breadcrumbs 
                        links={this.props.links}
                    />
                    <div id="adjust-font" className="font-adjust-icon">
                        <img alt="Adjust Font" onClick={this.adjustFontSize} src="https://res.cloudinary.com/senior-hub/image/upload/v1620231683/font_adjust_icon_1986b67eda.png?973705.3949995898"/>
                    </div>
                </div>
                <div style={{backgroundImage: `linear-gradient(to right, #E4E4E4, ${this.props.theme})`}} className={`search-overlay ${this.state.search ? "show-search" : ""}`}>
                    <div className="gcse-search"></div>
                </div>
            </nav>
        )
    }
}

export default Navbar
