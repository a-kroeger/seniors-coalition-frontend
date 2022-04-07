import React from 'react';
import { Link } from 'react-router-dom';

function Tile(props) {

    const category = props.categories.attributes.Title

    return (
            <Link to={`/${category}`} className="tile">
                {category}
            </Link>
    )
}

export default Tile;