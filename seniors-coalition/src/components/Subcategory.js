import React from 'react'
import ReactMarkdown from 'react-markdown';
import { Link, useRouteMatch } from 'react-router-dom';


function SubCategory(props) {

    const title = props.subCategories.attributes.Title
    const description = props.subCategories.attributes.Description
    const subCategory = props.subCategories.attributes.Url
    const { url } = useRouteMatch();

    return (
        <div className="subcategory">
            <h3>{title}</h3>
            <ReactMarkdown children={description} />
            <Link
              style={{background: props.theme}}
              className="button"
              to={`${url}/${subCategory}`} replace >
                Learn More
            </Link>
        </div>
    )
}

export default SubCategory;