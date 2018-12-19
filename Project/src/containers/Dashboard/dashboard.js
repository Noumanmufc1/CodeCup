import React, { Component } from 'react';
import classes from './dashboard.css'
import axios from 'axios';
import {Select} from 'semantic-ui-react';
import Footer from '../../components/Footer/Footer'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            challenge: [],
            level: 'Any'
        }
    }
    handleChange = (e, { value }) => {
        this.setState({ level: value })
  }
    componentDidMount() {
        const level = {
            level: this.state.level
        }
        axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(()=>{
            console.log(this.state.level)
            axios.post('/challenges', level, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result => {
                this.setState({challenge:result.data.challenge})
                console.log(result)
            }).catch(err => {
                console.log(err)
            })
        }).catch(()=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");
        })
        
    }
    getData = (level1)  => {
        const level = {
            level: level1
        }
        axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(()=>{
            axios.post('/challenges', level, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
            .then(result => {
                this.setState({challenge:result.data.challenge})
            }).catch(err => {
                console.log(err)
            })
        }).catch(()=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.push("/login");
        })
    }
    genhtml(html) {
        return {__html: html}
    }
    createTable = () => {
        let ab='';
        for (let i = 0; i < this.state.challenge.length; i++) {
            if(this.state.challenge.length > 0){
                var a = this.state.challenge[i]
                ab += "<p class=" + classes.link + "><span style='float: left'>" +  a.title + "</span>" + "<a href = './coding/"+ a._id + "'><button class="+ classes.solve + ">Solve Challenge</button></a></p>" 
            }
      }
      return {__html: ab}
    }

    
  render() {
    this.getData(this.state.level)
    return(
     <div className={classes.body} style={{textAlign: 'center'}}>	
        <h1 style={{color:'#CFA00F'}}> Challenges </h1>
        <br />
        <p style={{color:'#f2bb13'}}>
            <div className={classes.challenges}>
                <Select style={{float:'right', margin: '2%'}} name='level' onChange={this.handleChange} placeholder='Difficulty level' options={[{text:'Any', value: 'Any'}, {text:'Easy', value: 'Easy'}, {text:'Medium', value: 'Medium'}, {text:'Hard', value: 'Hard'}]} />
                <p dangerouslySetInnerHTML = {this.createTable()}></p>
            </div>
        </p>;  
        <Footer />               
	</div>
    )
  }
}

export default Dashboard;