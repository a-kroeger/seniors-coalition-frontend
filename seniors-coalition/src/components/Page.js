import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LearnMoreIcon from './LearnMoreIcon';
import Spinner from './Spinner';
import { Helmet } from 'react-helmet'

export class Page extends Component {

    componentDidMount () {
        this.props.getPageContent(this.props.match.params.id);
    };

    render() {
        const {
            itemName,
            longDescription,
            supplementaryDescription,
            imageGallery,
            coverImage,
            TestimonialOne,
            TestimonialTwo,
            TestimonialThree,
            BlockOneTitle,
            BlockOneContent,
            BlockTwoTitle,
            BlockTwoContent,
            BlockThreeTitle,
            BlockThreeContent,
            BlockFourTitle,
            BlockFourContent,
            BlockFiveTitle,
            BlockFiveContent,

        } = this.props.page;

        const { loading } = this.props;

        if ( loading ) return <Spinner />;

        return (
            <div className='page-container'>
                <Helmet>
                    <title>{(`${itemName} | Camrose, Alberta`)}</title>
                    <meta name="description" content={longDescription}></meta>
                </Helmet>
                {coverImage && coverImage.url &&
                    <img alt="" className="cover-img" src={coverImage.formats.large.url}>
                </img>}
                <h1 className="page-title">{itemName}</h1>
                <div id="landing" className="content-landing">
                    <p className="long-description">{longDescription}</p>
                    <AnchorLink offset='-110' href="#page-anchor" className="learn-more-btn">
                    <p>Scroll To <br></br>Learn More</p>
                        <div className="down-arrow">
                            <LearnMoreIcon width={15} height={50} fill={this.props.theme}/>
                            <LearnMoreIcon width={15} height={50} fill={this.props.theme}/>
                        </div>
                    </AnchorLink>
                </div>
                <div id="page-anchor"></div>
                {imageGallery &&
                    <div className="gallery">
                    {imageGallery[0] && imageGallery[0].url && 
                        <img alt="" className="img hero" src={imageGallery[0].formats.large.url}>
                    </img>}
                    {imageGallery[1] && imageGallery[1].url && 
                        <img alt="" className="img supplementary" src={imageGallery[1].formats.small.url}>
                    </img>}
                    {imageGallery[2] && imageGallery[2].url && 
                        <img alt="" className="img supplementary" src={imageGallery[2].formats.small.url}>
                    </img>}
                </div>
                }
                {supplementaryDescription && <div className="supdesc">
                <p>{supplementaryDescription}</p>    
                </div>}
                <div className="testimonial-panel">
                    {TestimonialOne && <h3 className="testimonial-header">Testimonials</h3>}
                    <div className="testimonials">
                        {TestimonialOne && <div className="testimonial">
                            <ReactMarkdown children={TestimonialOne}  />  
                        </div>}
                        {TestimonialTwo && <div className="testimonial">
                            <ReactMarkdown children={TestimonialTwo}  />   
                        </div>}
                        {TestimonialThree && <div className="testimonial">
                            <ReactMarkdown children={TestimonialThree}  />    
                        </div>}
                    </div>
                </div>
                {BlockOneTitle && <div className="custom-content-panel">
                    {BlockOneTitle && BlockOneContent && 
                        <div className="custom-block">
                            <h4>{BlockOneTitle}</h4>
                            <ReactMarkdown children={BlockOneContent} />
                        </div>
                    }
                    {BlockTwoTitle && BlockTwoContent && 
                        <div className="custom-block">
                            <h4>{BlockTwoTitle}</h4>
                            <ReactMarkdown children={BlockTwoContent} />
                        </div>
                    }
                    {BlockThreeTitle && BlockThreeContent && 
                        <div className="custom-block">
                            <h4>{BlockThreeTitle}</h4>
                            <ReactMarkdown children={BlockThreeContent} />
                        </div>
                    }
                    {BlockFourTitle && BlockFourContent && 
                        <div className="custom-block">
                            <h4>{BlockFourTitle}</h4>
                            <ReactMarkdown children={BlockFourContent} />
                        </div>
                    }
                    {BlockFiveTitle && BlockFiveContent && 
                        <div className="custom-block">
                            <h4>{BlockFiveTitle}</h4>
                            <ReactMarkdown children={BlockFiveContent} />
                        </div>
                    }
                
                </div>}
            </div>
        )
    }
}

export default Page
