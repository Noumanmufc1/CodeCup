import React, { Component } from 'react';
import classes from './login.css';
import { Button,  Form , Message} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import jtwDecode from 'jwt-decode';

class Login extends Component {
		//defining the state of the component
		state = {
			email:'',
			password:'',
			error: null,
			loading: false
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
				axios.post('/login', newUser)
				.then((result) => {
				if(result.status === 200){
						var decoded = jtwDecode(result.data.token);
						localStorage.setItem("TokenInfo", JSON.stringify(decoded));
						localStorage.setItem("Token", result.data.token);
						localStorage.setItem("Authentication"," ");
						this.props.history.replace("/challenge");	 
				}
			})
			.catch(error=>{
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
		if(!this.state.loading){	
			button =  <Button secondary type='submit' onClick={this.onSubmit}>Submit</Button>
		}else{
			button = <Button  disabled={true}  secondary  type='submit' >Submitting...</Button>
		}
		return(
		<div className={classes.main}>
			<div className = {classes.left}>
				{/* the left side of the webpage */}
				<h1 style={{fontSize:'36px'}}>Coding platform that you'll absolutely love</h1>
				<Link to = '/'><Button style={{backgroundColor:'#5bc0de'}}>View Home</Button></Link>
			</div>
			<div className = {classes.right}>	
				{/* the right side of the webpage i.e, the login form */}	
				<h1>Login</h1>
				{errorMessage}
				<p>Enter your details</p>
				<Form>
					<Form.Field>
						<label>Email: </label>
						<input placeholder='Email' type='email' name = 'email' onChange={this.onChange} />
					</Form.Field>
					<Form.Field>
						<label>Password: </label>
						<input placeholder='Password' type='password' name='password' onChange={this.onChange} />
					</Form.Field>
					{button}
				</Form>
				<br />
				<div style={{textAlign: 'center'}}>
					<p><Link to = './termsofservice'>Terms of Service</Link></p>
					<p>&nbsp;&nbsp;&nbsp;Don't have an account yet? Register <Link to = '/register'>here</Link></p>	
				</div>
			</div>
		</div>
    )
  }
}

export default Login;


