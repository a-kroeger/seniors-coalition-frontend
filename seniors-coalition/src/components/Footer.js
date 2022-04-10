import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export class Footer extends Component {

    state={
        fetchingContent: false,
        links: [],
        partners: []
    }

    componentDidMount(){
        this.setState({ fetchingContent : true })
        axios.get('https://seniors-coalition-admin.herokuapp.com/api/links')
            .then(res => { this.setState({ links : res.data.data }) })
        axios.get('https://seniors-coalition-admin.herokuapp.com/api/partners?populate=*')
            .then(res => { this.setState({ partners : res.data.data }) })
        this.setState({ fetchingContent : false })
    }

    render() {

        const { loading } = this.props;

        if ( loading ) return <></>;
        if ( this.state.fetchingContent ) return <></>;

        return (
            <footer>
                <div className="links">
                    <Link to="/contact">Contact Us</Link>
                    {this.state.links && <div className="link-grid">
                        {this.state.links.map(link =>
                            <a href={link.attributes.Url}>{link.attributes.Name}</a>
                        )}
                    </div>}
                    {this.state.partners && <div className="partners">
                        {this.state.partners.map(partner =>
                            <a href={partner.attributes.Url}>
                                <img src={partner.attributes.Logo.data.attributes.formats.small.url} />
                            </a>
                        )}
                    </div>}
                </div>
                <div className="bottom">
                    &copy; Camrose Seniors Coalition 2020 - {new Date().getFullYear()}
                </div>
            </footer>
        )
    }
}

export default Footer