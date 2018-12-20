import React, { Component } from 'react';
import {Form, TextArea, Button, Rating} from 'semantic-ui-react';
import classes from './feedback.css';
import axios from 'axios';
import {  Header, Icon, Modal } from 'semantic-ui-react'
import Footer from '../Footer/Footer'


class Feedback extends Component {
	//defining the state of the component
	state = {
		classname : String(classes.checked) + ' fa fa-star',
		isChecked : true,
		modalOpen: false,
		feedback: '',
		loading: false
	}
	//defining handles for opening and closing of the popup
	handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

	//onchange event for the textarea
	onChange = (event) => {
		this.setState({ [event.target.name]:event.target.value });
	}

	//onclick for submitting the feedback
	onClick = (e) => {
		console.log(localStorage.getItem("Token"))
		e.preventDefault()
		this.setState({
            loading:true
        })
		const feedback = {
			comments: this.state.feedback,
			rating: 5
		}
		axios.post('/feedback',feedback, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`}})
		.then((result) => {
			if(result.status === 201) {
				console.log('Feedback Created')
				this.setState({
					loading:false
				})
			}
			this.handleOpen()
		})
		.catch(error => {
			console.log(error)
			this.setState({
				loading:false
			})
		})
	}
	//checking if the user is logged in or not
	componentDidMount() {
		axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
		.then(()=>{})
		.catch(() => {
			localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");
		})
	}

  render() {
	//changing the submit button in response to clicking it
	let submitButton = false
	let submit = 'Submit'
	if(!this.state.loadingSubmit) {
		submit = 'Submit'
		submitButton = false;
	} else {
		submit = 'Submitting...'
		submitButton = true
	}
    return(
    <div className={classes.body}>
	  
      <div className={classes.main}>
		<div className={classes.output}>
			<div className={classes.heading}>
				<p className={classes.aimPara}>Feedback Form</p>
			</div>
			<div className= {classes.form}>
				<p className={classes.head}>Kindly rate the following aspects regarding your experience on CodeCup:</p>
				{/* ratings for different aspects of the website */}
				<table className={classes.table} style={{fontSize: "150%"}}>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Interface of website:<br /></td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge' onChange = {this.starChange}/>
						<br />
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Accuracy of results and problems:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Level of Difficulty:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Speed of website:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Performance in comparison of similar websites:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>How likely will you recommend it to someone else:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>How much did you learn:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Need for improvement:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
					<tr style={{background:'#252e38'}}>
						<td className={classes.value}>Overall Experience:</td>
						<td>
							<Rating maxRating={5} defaultRating={3} icon='star' size='huge'/>
						</td>
					</tr>
				</table>
				{/* textarea for any additional comments */}
				<p className={classes.head}>Enter any comments or suggestions you may have:</p>
				<Form className={classes.form}>
				    <TextArea name='feedback' onChange={this.onChange} placeholder='Tell us more' style={{ minHeight: 100 }} style={{marginBottom:'3%'}}/>
				    {/* popup */}
					<Modal
                        trigger={<Button  disabled={submitButton} onClick={this.onClick}>{submit}</Button>}
                        open={this.state.modalOpen}
						onClose={this.handleClose}
						basic
						size='mini'
					>
						<Header icon='browser' content='Submitted' />
						<Modal.Content>
						<h3>Feedback submitted successfully</h3>
						</Modal.Content>
						<Modal.Actions>
						<Button color='green' onClick={this.handleClose} inverted>
							<Icon name='checkmark' /> Close Popup
						</Button>
						</Modal.Actions>
					</Modal>
				
				</Form>
			</div>
		</div>
	  </div>
	  <Footer />
	</div>
    )
  }
}

export default Feedback;
