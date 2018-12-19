import React, { Component } from 'react'
import { Menu, Icon, Popup } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import classes from './logInNavbar.css'
import axios from 'axios'
class NavBar extends Component {
  state = {
    user: ''
  }

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

        <Popup trigger={
          <Link to = "/challenge">
            <Menu.Item
              name='Challenges'
              active={activeItem === 'challenge'}
              onClick={this.handleItemClick}
            >  
             <p style={{color:'#f2bb13'}}><Icon size='large' name='code' /></p>
            </Menu.Item>
          </Link>
        } content = 'Solve challenges' />
        
        <Popup trigger={
          <Link to = "/leaderboard">
            <Menu.Item
              name='Leaderboard'
              active={activeItem === 'leaderboard'}
              onClick={this.handleItemClick}
            >  
              <p style = {{color:'#f2bb13'}}><Icon size='large' name='chart bar' /></p>
            </Menu.Item>
          </Link>
        } content='See the Leaderboard' />
      	
        <Popup trigger={
          <Link to = "/feedback">
            <Menu.Item
              name='Feedback'
              active={activeItem === 'feedback'}
              onClick={this.handleItemClick}
            >  
              <p style = {{color:'#f2bb13'}}><Icon size='large' name='edit outline' /></p>
            </Menu.Item>
          </Link>
        } content = 'Give Feedback of the website' />
        
        
        <Menu.Menu position = 'right'>
        
        <Popup trigger = {
          <Link to = '/profile' className='right'>
            <Menu.Item name='profile' active={activeItem === 'profile'} onClick={this.handleItemClick}>
              <p style = {{color:'#f2bb13'}}><Icon size='large' name='user' /></p>
            </Menu.Item>
          </Link>
        } content = 'Profile' />
        <Popup trigger = {
          <Link to = '/' name='signout' onClick={this.props.logoutFunction}>
            <Menu.Item
              name='signout'
              active={activeItem === 'signout'}
              onClick={this.handleItemClick}
            >
            <p style = {{color:'#f2bb13'}}><Icon size='large' name='log out' /></p>
            </Menu.Item>
          </Link>
        } content = 'Log out' />
        
        </Menu.Menu>
      </Menu>
    )
  }
}

export default NavBar