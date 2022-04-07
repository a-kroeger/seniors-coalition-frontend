import React from 'react'
import { Link , useRouteMatch } from 'react-router-dom';

function Item(props) {

    const title = props.items.attributes.ItemName
    const longDescription = props.items.attributes.LongDescription
    const id = props.items.id
    const location = props.items.attributes.Url
    const { url } = useRouteMatch();

    return (
        <div className="item">
           {props.items.attributes.CoverImage.data && <img className="item-image" alt={title} src={props.items.attributes.CoverImage.data.attributes.formats.small.url} /> }
            <div>
                <div className="item-cont">
                <h2>{title}</h2>
                    <div className="module">
                        <p className="item-desc">{longDescription}</p>
                    </div>
                    <Link style={{background: props.theme}} className="button" to={`${url}/${location}/${id}`}>
                        Learn More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Item;