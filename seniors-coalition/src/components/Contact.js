import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

class Contact extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notificationIsShowing: false,
            sendResponse: '',
            name: '',
            email: '',
            message: ''
        }
        
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name =target.name

        this.setState({
            [name]: value
        });
    }

    handleApiResponse(data) {
        const successMessage = 'Thank you for your message, we will respond to you shortly.'
        const failureMessage = 'We have encountered an error with your message. To get in touch, please email us at contact@camroseseniorscoalition.com'

        if (data.success === 'true'){
            this.notification(successMessage)
        } if (data.success === 'false') {
            this.notification(failureMessage)
        }
    }

    notification(message) {
        
        document.getElementById('form').reset();
        this.setState({ 
            name: '',
            email: '',
            message: '' 
         })

        this.setState({ notificationIsShowing: true })
        this.setState({ sendResponse : message })
    }

    handleSubmit(event) {
        fetch("https://formsubmit.co/ajax/d3b2ea49ec7ac3fa88be2dab0c1c9635", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            })
        })
        .then(response => response.json())
        .then(data => this.handleApiResponse(data))
        .catch(error => console.log(error));
        event.preventDefault();
    }
  

    render() {
        return (
            <>
            <Helmet>
                    <title>Get in touch</title>
                    <meta name="description" content="A member of our team would be happy to assist you."></meta>
                    
                </Helmet>
            <div className="contact-form">
                <h1>Contact Us</h1>
                <form id='form' onSubmit={this.handleSubmit}>
                <label>
                    <div className="title">Name</div>
                    <input
                        required
                        type="text"
                        name="name"
                        onChange={this.handleChange} 
                    />
                </label>
                <label>
                    <div className="title">Email</div>
                    <input
                        required
                        type="text"
                        name="email"
                        onChange={this.handleChange}  
                    />
                </label>
                <label>
                    <div className="title">Message</div>
                    <textarea
                        required
                        name="message"
                        value={this.state.value}
                        onChange={this.handleChange} 
                    />
                </label>
                    <input className="submit" type="submit" value="Submit" />
            </form>
            </div>
            <div className={`message ${this.state.notificationIsShowing === true ? "active" : ''}`}>
                <div>
                    {this.state.sendResponse}
                    <br></br>
                    <br></br>
                    <Link to="/">Go back to home</Link>
                </div>
            </div>
            </>
        )
    }
}

export default Contact