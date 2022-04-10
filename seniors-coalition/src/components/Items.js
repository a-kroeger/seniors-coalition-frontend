import React, { Component } from 'react'
import Item from './Item'
import Spinner from '../components/Spinner'
import Promotions from '../components/Promotions';
import { Helmet } from 'react-helmet'

export class Items extends Component {
    
    componentDidMount() {
        this.props.getItems(this.props.match.params.subcategory);
        window.scrollTo(0, 0)
    }
    
    render (){
        const { items, loading, promotions, theme } = this.props;

        if (loading) return <Spinner />;

        const title = (this.props.match.params.subcategory).replace(/-/g, " ");
        const words = title.split(" ");
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i][0].toUpperCase() + words[i].substr(1);
        }
        
        words.join(" ");

        return <div className="content-container">
            <Helmet>
            <title>
                {words.join(" ")} | Seniors Coalition | Camrose, Alberta
            </title>
            </Helmet>
            <div className="subcategories">
            {items.map(items => (
                <Item
                    items={items} 
                    key={items.id}
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

export default Items;
