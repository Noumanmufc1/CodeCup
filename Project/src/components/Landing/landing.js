import React, { Component } from 'react';
import classes from './landing.css'
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer';
class Landing extends Component {
  render() {
    //changing where the button would redirect depending on whether the user is logged in or not
    let link = 'register'
    const tokenInfo = JSON.parse((localStorage.getItem('TokenInfo')));
    if(Boolean(localStorage.getItem("Authentication")) && tokenInfo) {
      link = 'challenge'
    }

    return(
    <div>
      <div className={classes.div1}>
        <p> <span className={classes.a}>From </span> <span className={classes.title}>  Beginner </span> <span className={classes.a}> To </span> <span className={classes.title}> Expert </span> <br /> <br />
        <span className={classes.subtitle} > Brush up your coding skills in a fun yet effective way. </span> <br /> <br />
        <Link to = {"/" + link}><button type="button" className="btn btn-warning">Get started</button></Link></p>
    	</div>
      <div className={classes.div2}>
        <h1 className={classes.h1}> Join the league of Programmers! </h1><br />
        <p className={classes.heading}> Practise </p>
        <p className={classes.subheading}> Solve challenges in Python of all difficulty levels. </p>
        <p className={classes.heading}> Compete </p>
        <p className={classes.subheading}> Compete with the programmers from around the world and prove that you are the best. </p>
        <p className={classes.heading}> Become an expert </p>
        <p className={classes.subheading}> In no time, we will help you jump from a beginner to an expert. </p>
      </div>
      <div className={classes.languages}>
	    </div>
      {/* slideshow */}
      <div classes = {classes.slideShow}>
        <div id="myCarousel" className={"carousel slide" + ' ' + String(classes.slideShow)} data-ride="carousel">
        {/* <!-- Wrapper for slides --> */}
          <div className="carousel-inner">
            <div className="item active">
              <q>Many good programmers do programmming not because they expect to get paid or get adulation by the public but because it is fun to program.</q><br />
              <p className={classes.author}>~ Linus Torvalds</p>
            </div>

            <div className="item">
            <q>Java is to JavaScript as ham is to hamster.</q><br />
              <p className={classes.author}>~ Jermey Keith</p>
            </div>

            <div className="item">
            <q style={{marginBottom:'0'}}>While (nosuccess)<br /><span style={{paddingLeft:'1%', marginBottom:'0'}}>tryagain();</span><br /><span style={{paddingLeft:'6%', marginBottom:'0'}}>if (dead)</span><br /><span style={{paddingLeft:'9%', marginBottom:'0'}}>break;</span></q>
              <p className={classes.author}>~ Anonymous</p>
            </div>
          </div>

          {/* <!-- Left and right controls --> */}
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div className={classes.div4}>
        <h1 className={classes.h1}> Why? </h1><br />
        <p className={classes.heading}> Different difficulty levels </p>
        <p className={classes.subheading}> There is flexibility to choose from easy, medium and hard difficulty level according to your current skill level.</p>
        <p className={classes.heading}> Learn from others </p>
        <p className={classes.subheading}> You can learn from programmers from all around the globe.</p>
        <p className={classes.heading}> Security </p>
        <p className={classes.subheading}> Your personal information is secure with us. Only you can view and change it.</p>
	    </div>
      <Footer />
    </div>

    )
  }
}

export default Landing;
