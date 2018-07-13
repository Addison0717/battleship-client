import React, {PureComponent} from 'react'
import {TextField, Button} from 'material-ui';
import './LoginForm.css'

export default class LoginForm extends PureComponent {
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
      <div className="login-form">
  			<form onSubmit={this.handleSubmit}>


  				{/* <label>
            Email &nbsp;
            <input type="email" name="email" value={
  						this.state.email || ''
						} onChange={ this.handleChange } classes="" />
          </label> */}

					<label className='textField'> <TextField
					label="Email Address"
          type="email"
					name="email"
					fullWidth
          value={	this.state.email || '' } 
          onChange={ this.handleChange }
          margin="normal"
        	/> </label>

  				{/* <label>
            Password &nbsp;
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

					{/* <button type="submit">Login</button>*/}

					<Button color="default" type="submit" id="loginButton">
						Login
					</Button>

  			</form>
		  </div>)
	}
}
