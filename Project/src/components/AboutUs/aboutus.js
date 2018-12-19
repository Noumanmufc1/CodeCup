import React, { Component } from 'react';
import classes from './aboutus.css'
import video from '../../assets/about.mp4'
import Footer from '../Footer/Footer'
import {Icon} from 'semantic-ui-react'

class Aboutus extends Component {
  render() {
    return(
      <div className={classes.body}>
      	<header className={classes.header}>
			<video className={classes.video}  autoPlay="autoplay" muted="muted" loop="loop">
	    		<source src={video} type="video/mp4" />
	 		</video>
	  		<div className={classes.headerContainer}>
	   		    <div>
	   			   <div style={{color:'white'}}>
	      			  <h1>CodeCup</h1>
	       			  <h2>A Coding platform for everyone</h2>
	      		   </div>
	   		    </div>
	 		</div>
		</header>
		<div className={classes.aimmain}>
			<div className={classes.heading}>
				<p className={classes.aimPara}>Our Aim</p>
			</div>
	 	 	<div className={classes.aim}>
	 	 		<p>At CodingCup, our goal is to let programmers keep on improving their coding skills by solving the World's most challenging problems, learn new concepts, and get inspired by the best developers.</p>
	 	 	</div>
		</div>
		<div className={classes.main}>
			<div className={classes.founders}>
				<div className={classes.heading} style={{height:'8%'}}>
					<p className={classes.aimPara}>Our Founders</p>
				</div>
				<div className={classes.card}>		
					<div style={{textAlign:'center', padding:'2.5%'}} >
				    	<h1><b>Zara Hussain</b></h1>
						<hr /> 
				    	<h3>Website Developer</h3> 
						<hr />
						<hr />
						<div style = {{marginRight:'10%'}}>
							<Icon style = {{marginLeft:'10%'}} name='github' size='huge' />
							<Icon style = {{marginLeft:'10%'}}  name='mail' size='huge' />
							<Icon style = {{marginLeft:'10%'}}  name='facebook' size='huge' />
						</div>
					</div>  	
				</div>

				<div className={classes.card}>		
					<div style={{textAlign:'center', padding:'2.5%'}} >
				    	<h1><b>Nouman Ahmed</b></h1>
						<hr /> 
				    	<h3>Website Developer</h3> 
						<hr /> 
						<hr />
						<div style = {{marginRight:'10%'}}>
							<Icon style = {{marginLeft:'10%'}} name='github' size='huge' />
							<Icon style = {{marginLeft:'10%'}}  name='mail' size='huge' />
							<Icon style = {{marginLeft:'10%'}}  name='facebook' size='huge' />
						</div>
						
				  	</div>  	
				</div>
			</div>
      	</div>
		<Footer />
    </div>
    )
  }
}

export default Aboutus;
