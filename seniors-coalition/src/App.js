import React, { Fragment, Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Tiles from './components/Tiles';
import Navbar from './components/Navbar';
import SubCategories from './components/SubCategories';
import Items from './components/Items';
import Page from './components/Page';
import Events from './components/Events';
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
    keyColour: 0,
    theme: null,
    error: false,
  };

  // Get Tiles for Homepage
 async componentDidMount() {
   this.setState({ loading : true })
   const res = await axios.get('https://seniors-coalition.herokuapp.com/tiles');
   this.setState({ categories: res.data, loading: false });
   this.setKeyColour();
   this.setTheme();
 }

 getCategories = async tiles => {
  this.setState({ loading : true })
  const res = await axios.get('https://seniors-coalition.herokuapp.com/tiles');
  this.setState({ categories: res.data, loading: false });
  this.setKeyColour();
  this.setTheme();
 }

 // Get Subcategories for Category Pages
 getSubCategories = async category => {
   this.setState({ loading : true })
   const res = await axios.get(`https://seniors-coalition.herokuapp.com/sub-categories?tiles.title=${category}`);
   const ret = await axios.get('https://seniors-coalition.herokuapp.com/promotions');
   this.setState({ subCategories: res.data, promotions: ret.data, loading: false });
   if(this.state.subCategories.length === 0){
     window.location.replace("/404");
   }

   this.setKeyColour();
   this.setTheme();
 }

 // Get Items for Subcategory Pages
 getItems = async subcategory => {
    this.setState({ loading : true })
    const res = await axios.get(`https://seniors-coalition.herokuapp.com/items?sub_categories.url_eq=${subcategory}`);
    const ret = await axios.get('https://seniors-coalition.herokuapp.com/promotions');
    this.setState({ items: res.data, promotions: ret.data, loading: false });
    if(this.state.items.length === 0){
      window.location.replace("/404");
    }

    this.setKeyColour();
    this.setTheme();
 }

 // Get Item Content For Pages
 getPageContent = async id => {
   this.setState({ loading : true })
   const res = await axios.get(`https://seniors-coalition.herokuapp.com/items/${id}`).then((res) => {
     this.setState({ page: res.data, loading: false });
   }).catch((error) => {
     window.location.replace("/404");
   })
   this.setKeyColour();
   this.setTheme();
 }

 // Set Key Colour Based on Navigational Position
 setKeyColour(){
  let pathnames = window.location.pathname.split('/').filter(x => x);
  let currentCategory = (pathnames[0]);
  let category = this.state.categories;
  const categories = category.map(x => x.title)
  let categoryMatch = categories.indexOf(currentCategory)+1;
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
          <Switch>
            <Route exact path="/"
               render={props => (
                  <Tiles
                    {...props}
                    getCategories={this.getCategories}
                    categories={this.state.categories} 
                    loading={this.state.loading}
                    links={this.state.categories}
                    keyColour={this.state.keyColour}
                    theme={this.state.theme}
                  />
                )} />
            <Route exact path='/events'
            render={props => (
              <Events
              {...props}
              loading={this.state.loading}
              links={this.state.categories}
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
        </Router>
    </Fragment>
  )}
}

export default App;