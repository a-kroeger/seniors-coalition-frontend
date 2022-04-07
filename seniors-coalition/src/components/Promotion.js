import React from 'react'

function Promotion(props) {

    const description = props.promotions.attributes.PromotionDescription
    const logo = props.promotions.attributes.Logo.data.attributes.formats.thumbnail.url
    const link = props.promotions.attributes.PromotionURL
    const company = props.promotions.attributes.CompanyName
    
    return (
        <div className="promotion">
            <img alt={company} className="promotion-logo" src={logo} />
            <p className="promotion-description">{description}</p>
            <a rel="nofollow" className="promotion-link" href={link}>Learn More</a>
        </div>
    )
}

export default Promotion;