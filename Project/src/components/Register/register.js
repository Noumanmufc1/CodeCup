import React, { Component } from 'react';
import classes from './register.css'
import { Button, Select, Form, Message } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import axios from 'axios';
class Register extends Component {
	//defining the state of the component
	state= {  
		username:'',
		password:'',
		email:'',
		firstname:'',
		lastname:'',
		country:'',
		loading: false,
		error: null
	}
	//handling change for the select component
	handleChange = (e, { value }) => {
		this.setState({ country: value })
	}
	//defining onchange event for different fields of the form
	onChange = (event) => {
		this.setState({ [event.target.name]:event.target.value });
	}
	//onsubmit event after the form is submitted
	onSubmit = (e) => {
		e.preventDefault();
		this.setState({
			loading:true
		})
		const newUser = this.state;
		axios.post('/register', newUser)
		.then((result) => {
			if(result.status === 201){
					this.props.history.push("./login");
			} 
		})
		.catch(error=>	{
			this.setState({
				error:error.response.data.message,
				loading:false
			})
		})
	}

  render() {
	//changing submit button or displaying error message
	let errorMessage = null;
	let button = null;
	if(this.state.error){
		errorMessage = <Message  negative>
		<p style={{textAlign:"center"}}>{this.state.error}</p>
		</Message>
	}
	console.log(this.state.error)

	if(!this.state.loading){	
		button =  <Button secondary type='submit' onClick={this.onSubmit}>Submit</Button>
	}else{
		button = <Button  disabled={true}  secondary  type='submit' >Creating...</Button>
	}

    return(
       <div className={classes.main}>
			<div className = {classes.left}>
				{/* the left side of the webpage */}
				<h1 style={{fontSize:'36px'}}>Coding platform that you'll absolutely love</h1>
				<Link to = '/'><Button style={{backgroundColor:'#5bc0de'}}>View Home</Button></Link>
			</div>
			<div className = {classes.right}>
				<h1>Register</h1>
				{errorMessage}
				<p>Enter your details</p>
				{/* the right side of the webpage i.e, the login form */}
				<Form>
					<Form.Field>
						<label>First name: </label>
						<input placeholder='First Name' type='text' name='firstname' onChange={this.onChange}/>
					</Form.Field>
					<Form.Field>
						<label>Last name: </label>
						<input placeholder='Last Name' type='text' name='lastname' onChange={this.onChange}/>
					</Form.Field>
					<Form.Field>
						<label>Email: </label>
						<input placeholder='Email' type='email' name='email' onChange={this.onChange}/>
					</Form.Field>
					<Form.Field>
						<label>Country: </label>								
						<Select name='country' onChange={this.handleChange} placeholder='Select your country' options={[{text:'Pakistan', value: 'Pakistan'}, {text:'India', value: 'India'}, {text:'China', value: 'China'}, {text:'America', value: 'America'}, {text:'UK', value: 'UK'}, {text:'Canada', value: 'Canada'}]} />
					
					</Form.Field>
					<Form.Field>
						<label>Username </label>
						<input type='text' name='username' placeholder='username' onChange={this.onChange}/>
					</Form.Field>
					<Form.Field>
						<label>Password: </label>
						<input placeholder='Password' type='password' name='password' onChange={this.onChange}/>
					</Form.Field>
					{button}
				</Form>
				<br />
				<div style={{textAlign: 'center'}}>
					<p><Link to = './termsofservice'>Terms of Service</Link></p>
					<p >&nbsp;&nbsp;&nbsp;Already have an account? Login <Link to = '/login'>here</Link></p>	
				</div>
			</div>
		</div>
    )
  }
}

export default Register;
