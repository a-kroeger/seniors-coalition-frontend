import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Tiles from './components/Tiles';
import Navbar from './components/Navbar';
import SubCategories from './components/SubCategories';
import Items from './components/Items';
import Page from './components/Page';
import Footer from './components/Footer'
import Contact from './components/Contact'
import Error from './components/Error';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    loading: false,
    categories: [],
    subCategories: [],
    items: [],
    page: {},
    promotions: [],
    aboutText: '',
    slides: [],
    banner: {},
    keyColour: 0,
    theme: null,
    error: false,
  };

  // Set theme colour based on what page the user is on
 async componentDidMount() {
   this.setState({ loading : true })
   const res = await axios.get('https://seniors-coalition-admin.herokuapp.com/api/tiles');
   this.setKeyColour();
   this.setState({ categories: res.data.data, loading: false });
   this.setTheme();
 }

// Get tiles for homepage
 getCategories = async tiles => {
  this.setState({ loading : true })
    axios.get('https://seniors-coalition-admin.herokuapp.com/api/about')
      .then(res => { this.setState({ aboutText : res.data.data.attributes.CoverText }) })
      axios.get('https://seniors-coalition-admin.herokuapp.com/api/banner')
      .then(res => { this.setState({ banner : res.data.data.attributes }) })
      axios.get('https://seniors-coalition-admin.herokuapp.com/api/gallery-images?populate=*')
  .then(res => { this.setState({ slides : res.data.data })})
  const res = await axios.get('https://seniors-coalition-admin.herokuapp.com/api/tiles');
  this.setState({ categories: res.data.data, loading: false });
  this.setKeyColour();
  this.setTheme();
 }

 // Get Subcategories for Category Pages
 getSubCategories = async category => {
   this.setState({ loading : true })
   const res = await axios.get(`https://seniors-coalition-admin.herokuapp.com/api/subcategories?filters[tile][Title]=${category}&populate=*`);
   const ret = await axios.get('https://seniors-coalition-admin.herokuapp.com/api/promotions?populate=*');
   this.setState({ subCategories: res.data.data, promotions: ret.data.data, loading: false });
   if(this.state.subCategories.length === 0){
     window.location.replace("/404");
   }

   this.setKeyColour();
   this.setTheme();
 }

 // Get Items for Subcategory Pages
 getItems = async subcategory => {
    this.setState({ loading : true })
    const res = await axios.get(`https://seniors-coalition-admin.herokuapp.com/api/items?filters[subcategory][Url]=${subcategory}&populate=*`);
    const ret = await axios.get('https://seniors-coalition-admin.herokuapp.com/api/promotions?populate=*');
    this.setState({ items: res.data.data, promotions: ret.data.data, loading: false });
    if(this.state.items.length === 0){
      window.location.replace("/404");
    }

    this.setKeyColour();
    this.setTheme();
 }


 // Set Key Colour Based on Navigational Position
 setKeyColour(){
  let pathnames = window.location.pathname.split('/').filter(x => x);
  let currentCategory = (pathnames[0])
  const currentCategoryStructured = decodeURI(currentCategory)
  let category = this.state.categories;
  const categories = category.map(x => x.attributes.Title)
  let categoryMatch = categories.indexOf(currentCategoryStructured)+1;
  this.setState({ keyColour: (categoryMatch) })
    
 }

 // Match Key Colour to Theme
 setTheme(){
  switch(this.state.keyColour){
    default: this.setState({ theme: '#E4E4E4' });
    break;
    case 1: this.setState({ theme: '#A97FA8' });
    break;
    case 2: this.setState({ theme: '#A5D58E' });
    break;
    case 3: this.setState({ theme: '#EFEC8D' });
    break;
    case 4: this.setState({ theme: '#8CADD5' });
    break;
    case 5: this.setState({ theme: '#EE777B' });
    break;
    case 6: this.setState({ theme: '#A97FA8' });
    break;
    case 7: this.setState({ theme: '#A5D58E' });
    break;
    case 8: this.setState({ theme: '#EFEC8D' });
    break;
    case 9: this.setState({ theme: '#8CADD5' });
    break;
    case 10: this.setState({ theme: '#EE777B' });
    break;
    case 11: this.setState({ theme: '#A97FA8' });
    break;
    case 12: this.setState({ theme: '#A5D58E' });
    break;
    case 13: this.setState({ theme: '#EFEC8D' });
    break;
    case 14: this.setState({ theme: '#8CADD5' });
    break;
    case 15: this.setState({ theme: '#EE777B' });
    break;
  }
 }

  render() {
  return (
    <Fragment>
      <Router>
        <Navbar
          links={this.state.categories}
          keyColour={this.state.keyColour}
          theme={this.state.theme}
        />
        <body id="primary-content">
          <Switch>
            <Route exact path="/"
               render={props => (
                  <Tiles
                    {...props}
                    getCategories={this.getCategories}
                    categories={this.state.categories} 
                    loading={this.state.loading}
                    links={this.state.categories}
                    aboutText={this.state.aboutText}
                    slides={this.state.slides}
                    banner={this.state.banner}
                    keyColour={this.state.keyColour}
                    theme={this.state.theme}
                  />
                )} />
            <Route exact path='/404'
              render={props => (
                <Error
                {...props}
                loading={this.state.loading}
                />
            )} />
            <Route exact path='/contact'>
              <Contact />
            </Route>
            <Route exact path='/:category'
               render={props => (
                  <SubCategories
                    {...props}
                    subCategories={this.state.subCategories}
                    getSubCategories={this.getSubCategories}
                    promotions={this.state.promotions}
                    loading={this.state.loading}
                    links={this.state.categories}
                    keyColour={this.state.keyColour}
                    theme={this.state.theme}
                  />
                )} />
            <Route exact path='/:category/:subcategory'
               render={props => (
                  <Items
                    {...props} 
                    items={this.state.items}
                    getItems={this.getItems}
                    promotions={this.state.promotions}
                    loading={this.state.loading}
                    links={this.state.categories}
                    keyColour={this.state.keyColour}
                    theme={this.state.theme}
                  />
                )} />
            <Route exact path='/:category/:subcategory/:location/:id'
               render={props => (
                  <Page
                    {...props} 
                    page={this.state.page}
                    getPageContent={this.getPageContent}
                    loading={this.state.loading}
                    links={this.state.categories}
                    keyColour={this.state.keyColour}
                    theme={this.state.theme}
                  />
                )} />
            </Switch>
            </body>
          <Footer
            loading={this.state.loading}
          />
        </Router>
    </Fragment>
  )}
}

export default App;