import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

export class Homebanner extends Component {

    state={
        loading: false,
        aboutText: '',
        slides: [],
        banner: {}
    }

    componentDidMount(){
        this.setState({ loading : true })
        axios.get('https://seniors-coalition-admin.herokuapp.com/api/about')
            .then(res => { this.setState({ aboutText : res.data.data.attributes.CoverText }) })
        axios.get('https://seniors-coalition-admin.herokuapp.com/api/banner')
            .then(res => { this.setState({ banner : res.data.data.attributes }) })
        axios.get('https://seniors-coalition-admin.herokuapp.com/api/gallery-images?populate=*')
            .then(res => { this.setState({ slides : res.data.data })})
        this.setState({ loading : false })
    }

    render() {
        if (this.state.loading) return <div className="banner"></div>

        return (
            <div className="banner">
                <div className="col1">
                    <h1 className="site-header">Camrose Seniors Coalition</h1>
                    {this.state.aboutText && <div className="about">
                        {this.state.aboutText}
                    </div>}
                    {this.state.slides && <Carousel>
                        {this.state.slides.map(slide => (
                            <div>
                                <img src={slide.attributes.Image.data.attributes.formats.medium.url} />
                                <p className="legend">
                                    <a href={slide.attributes.Link}>{slide.attributes.Text}</a>
                                </p>
                            </div>
                        ))}
                    </Carousel>}
                </div>
                {this.state.banner.BannerText && <div className="col2">
                    <h2 className="banner-title">{this.state.banner.Title}</h2>
                    <p className="banner-text">{this.state.banner.BannerText}</p>
                </div>}
            </div>
        )
    }
}

export default Homebanner