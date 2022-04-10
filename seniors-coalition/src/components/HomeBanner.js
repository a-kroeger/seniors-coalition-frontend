import React, { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export class Homebanner extends Component {

    render() {
        return (
            <div className="banner">
                <div className="col1">
                    <h1 className="site-header">Camrose Seniors Coalition</h1>
                    {this.props.aboutText && <div className="about">
                        {this.props.aboutText}
                    </div>}
                    {this.props.slides && <Carousel>
                        {this.props.slides.slice(0).reverse().map(slide => (
                            <div key={slide.id}>
                                <img src={slide.attributes.Image.data.attributes.formats.medium.url} />
                                {slide.attributes.Link && <p className="legend">
                                    <a href={slide.attributes.Link}>{slide.attributes.Text}</a>
                                </p>}
                            </div>
                        ))}
                    </Carousel>}
                </div>
                {this.props.banner.BannerText && <div className="col2">
                    <h2 className="banner-title">{this.props.banner.Title}</h2>
                    <ReactMarkdown className="banner-text" children={this.props.banner.BannerText}/>
                </div>}
            </div>
        )
    }
}

export default Homebanner