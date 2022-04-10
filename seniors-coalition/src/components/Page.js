import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import LearnMoreIcon from './LearnMoreIcon';
import Spinner from './Spinner';
import { Helmet } from 'react-helmet'

export default function Page(props) {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const { id } = props.match.params
        window.scrollTo(0, 0)
        axios.get(`https://seniors-coalition-admin.herokuapp.com/api/items?filters[id]=${id}&populate=*`)
            .then(res => {
                const { attributes } = res.data.data[0]
                setData(attributes)
                setLoading(false)
            })
    }, [])

    const {
        ItemName,
        LongDescription,
        SupplementaryDescription,
        ImageGallery,
        CoverImage,
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

    } = data;

    if(loading === true) return <Spinner />

    return (
            <div className='page-container'>
                <Helmet>
                    {ItemName && <title>{(`${ItemName} | Camrose, Alberta`)}</title>}
                    {LongDescription && <meta name="description" content={LongDescription}></meta>}
                </Helmet>
                {CoverImage && CoverImage.data !== null &&
                    <img alt="" className="cover-img" src={CoverImage.data.attributes.formats.large.url}>
                </img>}
                <h1 className="page-title">{ItemName}</h1>
                <div id="landing" className="content-landing">
                    <p className="long-description">{LongDescription}</p>
                    <AnchorLink offset='-110' href="#page-anchor" className="learn-more-btn">
                    <p>Scroll To <br></br>Learn More</p>
                        <div className="down-arrow">
                            <LearnMoreIcon width={15} height={50} fill={props.theme}/>
                            <LearnMoreIcon width={15} height={50} fill={props.theme}/>
                        </div>
                    </AnchorLink>
                </div>
                <div id="page-anchor"></div>
                {ImageGallery &&
                    <div className="gallery">
                    {ImageGallery.data && ImageGallery.data[0] && 
                        <img alt="" className="img hero" src={ImageGallery.data[0].attributes.formats.small.url}>
                    </img>}
                    {ImageGallery.data && ImageGallery.data[1] && 
                        <img alt="" className="img supplementary" src={ImageGallery.data[1].attributes.formats.small.url}>
                    </img>}
                    {ImageGallery.data && ImageGallery.data[2] &&  
                        <img alt="" className="img supplementary" src={ImageGallery.data[2].attributes.formats.small.url}>
                    </img>}
                </div>
                }
                {SupplementaryDescription && <div className="supdesc">
                <p>{SupplementaryDescription}</p>    
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
