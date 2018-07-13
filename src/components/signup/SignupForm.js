import React, {PureComponent} from 'react'
import {TextField, Button} from 'material-ui';
import './SignupForm.css'

export default class SignupForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

	render() {
		return (
      <div className="signup-form">
  			<form onSubmit={this.handleSubmit}>

  				{/* <label>
            Email
            <input type="email" name="email" value={
  						this.state.email || ''
  					} onChange={ this.handleChange } />
          </label> */}

					<label className='textField'> <TextField
          id="email"
          label="Email Address"
					type="email"
					name="email"
					margin="normal"
					fullWidth
					value={
						this.state.email || ''
					} onChange={ this.handleChange } 
       		 /> </label>
  					
  				{/* <label>
            Password
  					<input type="password" name="password" value={
  						this.state.password || ''
  					} onChange={ this.handleChange } />
  				</label> */}

					<label className='textField'> <TextField
          id="password-input"
          label="Password"
					type="password"
					name="password"
					margin="normal"
					fullWidth
					value={
						this.state.password || ''
					} onChange={ this.handleChange } 
       		 /> </label>
					

  				{/* <label>
            Confirm password
  					<input type="password" name="confirmPassword" value={
  						this.state.confirmPassword || ''
  					} onChange={ this.handleChange } />
  				</label> */}

					<label className='textField'> <TextField
          id="confirm-password-input"
          label="Confirm Password"
					type="password"
					name="confirmPassword"
					margin="normal"
					fullWidth
					value={
						this.state.confirmPassword || ''
					} onChange={ this.handleChange } 
       		 /> </label>


  				{
  					this.state.password &&
  					this.state.confirmPassword &&
  					this.state.password !== this.state.confirmPassword &&
  					<p style={{color:'red'}}>The passwords do not match!</p>
  				}

  				{/* <button type="submit">Sign up</button> */}
					<Button color="default" type="submit" id="signupButton">
						Sign Up
					</Button>
  			</form>
      </div>
		)
	}
}
