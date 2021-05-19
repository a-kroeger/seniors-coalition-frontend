import React from 'react'

function Promotion(props) {

    const description = props.promotions.PromotionDescription
    const logo = props.promotions.Logo.formats.thumbnail.url
    const link = props.promotions.PromotionURL
    const company = props.promotions.CompanyName
    
    return (
        <div className="promotion">
            <img alt={company} className="promotion-logo" src={logo} />
            <p className="promotion-description">{description}</p>
            <a rel="nofollow" className="promotion-link" href={link}>Learn More</a>
        </div>
    )
}

export default Promotion;