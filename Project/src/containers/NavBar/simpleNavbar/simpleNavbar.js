import React, { Component } from 'react'
import { Menu, Icon, Popup } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import classes from './simpleNavbar.css'
export default class NavBar extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (

      <Menu style={{background:'black', margin: '0px'}}>
      <Menu.Item style={{fontSize:'125%'}}>  
          <span style={{color:'#f2bb13'}}>Code</span><span style={{color: 'white'}}>Cup</span>
        </Menu.Item>
        <Popup trigger={
          <Link to = "/">
	        <Menu.Item
	          name='home'
	          active={activeItem === 'home'}
	          onClick={this.handleItemClick}
	        >  
          <p style={{color:'#f2bb13'}}><Icon size='large' name='home' /></p>
        </Menu.Item>
        </Link>
        } content='Visit Homepage' />
      	
        <Link to = "/aboutus">
	        <Menu.Item
	          name='aboutus'
	          active={activeItem === 'aboutus'}
	          onClick={this.handleItemClick}
	        >  
          <p className = {classes.white}>About Us</p>
        </Menu.Item>
        </Link>
        <Menu.Menu position = 'right'>
        <Link to = '/login' className='right'>
        <Menu.Item name='login' active={activeItem === 'login'} onClick={this.handleItemClick}>
          <p className = {classes.white}>Login</p>
        </Menu.Item>
        </Link>
        <Link to = '/register'>
        <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={this.handleItemClick}
        >
          <p className = {classes.white}>Register</p>
        </Menu.Item>
        </Link>
        </Menu.Menu>
      </Menu>
    )
  }
}
