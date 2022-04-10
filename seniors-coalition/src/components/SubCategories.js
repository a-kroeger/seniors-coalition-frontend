import React, { Component } from 'react'
import SubCategory from './Subcategory'
import Spinner from './Spinner'
import Promotions from './Promotions'
import { Helmet } from 'react-helmet'

export class SubCategories extends Component {
    
    componentDidMount() {
        this.props.getSubCategories(this.props.match.params.category);
        window.scrollTo(0, 0)
    }
    
    render (){
        const { subCategories , loading , promotions , theme } = this.props;

        if (loading) return <Spinner />;

        return <div className="content-container">
        <Helmet>
            <title>{(this.props.match.params.category)[0].toUpperCase()
             + (this.props.match.params.category).substring(1)} For Seniors | Seniors Coalition | Camrose, Alberta
            </title>
        </Helmet>
        <div className="subcategories">
            {subCategories.map(subCategories => (
                <SubCategory
                    subCategories={subCategories} 
                    key={subCategories.id}
                    theme={theme}
                />
            ))}
            
        </div>
        <Promotions
                promotions={promotions}
                key={promotions.id}
            />
        </div>
    }
}

export default SubCategories;
