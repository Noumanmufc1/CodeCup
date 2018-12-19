import React, { Component } from 'react'
import './NavBar.css'
import LogInNavbar from './logInNavbar/logInNavbar';
import SimpleNavbar from './simpleNavbar/simpleNavbar';

class myNav extends Component {
  
  state = {
    isAuthenticated : Boolean(localStorage.getItem("Authentication")),
    shouldUpdate: true
  }

  logoutHandler = ()=>{
    localStorage.removeItem("Authentication");
    localStorage.removeItem("Token");
    localStorage.removeItem("TokenInfo");
    this.setState({isAuthenticated:false,shouldUpdate:true});
  }

  componentDidUpdate(){
   
    if(Boolean(localStorage.getItem("Authentication")) && (this.state.shouldUpdate)){
     
      this.setState({isAuthenticated:true,shouldUpdate:false});
    }else if((Boolean(localStorage.getItem("Authentication"))===false) && ((this.state.shouldUpdate))===false){
     
      this.setState({isAuthenticated:false,shouldUpdate:true});

    }
  }

  render() {
    
    let header = null;
    
    const tokenInfo = JSON.parse((localStorage.getItem('TokenInfo')));
   
    if(this.state.isAuthenticated){
     
      if(tokenInfo){
        header = <LogInNavbar link='/' logoutFunction={this.logoutHandler} />
      }else{
        header = <SimpleNavbar />;
      }     
    }else{
    
      header = <SimpleNavbar/>;
    }

   return(
    <div> {header}</div>   
    )
  }
}

export default myNav;