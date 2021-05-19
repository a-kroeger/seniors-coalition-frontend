import React from 'react'
import { Link , useRouteMatch } from 'react-router-dom';

function Item(props) {

    const title = props.items.itemName
    const longDescription = props.items.longDescription
    const id = props.items.id
    const location = props.items.url
    const { url } = useRouteMatch();

    return (
        <div className="item">
           {props.items.coverImage && <img className="item-image" alt={title} src={props.items.coverImage.formats.small.url} /> }
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