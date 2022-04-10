import React, { Component } from 'react'
import Tile from './Tile'
import Spinner from './Spinner'
import { Helmet } from 'react-helmet'
import HomeBanner from './HomeBanner'

export class Tiles extends Component {

    componentDidMount() {
        this.props.getCategories();
        window.scrollTo(0, 0)
    }

    render (props){
        const { categories, loading,  } = this.props;

        if (loading) return <Spinner />;

        return <>
            <HomeBanner 
                aboutText={this.props.aboutText}
                slides={this.props.slides}
                banner={this.props.banner}
            />
            <div className="tiles">
                <Helmet>
                    <title>Homepage | Seniors Coalition</title>       
                    <meta name="description" content="The Seniors Coalition Homepage"></meta>       
                </Helmet>
            {categories.map(categories => (
                <Tile
                    categories={categories}
                    key={categories.id}
                />
            ))}
            </div>
        </>
    }
}

export default Tiles;
