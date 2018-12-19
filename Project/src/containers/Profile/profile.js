import React, { Component } from 'react';
import _ from 'lodash'
import classes from './profile.css'
import { Button, Progress, Form, Input} from 'semantic-ui-react'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'
class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      skill: [],
      value: "Your Description",
      isInEditMode: false,
      Ishidden: true,
      user: '',
      country: '',
      image: null,
      imagePath: ''
    };
  }

  onSubmit = (e) =>{
    e.preventDefault();
    const fd = new FormData();
   
    fd.append('image',this.state.image,this.state.image.name);
   

    axios.post('/profileImage',fd,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
    .then(result=>{

        axios.get('/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
            this.setState({
                //error:null,
                imagePath:result.data.profile.userImage
                //loading:false
            });  
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.replace('/login');
        })
    })
    .catch(error=>{
        // this.setState({
        //     imageError:error.response.data.message,
        //     loading:false
        // })
    })
  }
  fileSelectHandler = (event) =>{
      
    this.setState({
        image:event.target.files[0]
    })
  
}

fileSelectHandler = (event) =>{
  
    this.setState({
        image:event.target.files[0]
    })
  
}




  addskill(){
  var newskill = this.state.skill;
  if(this.refs.textBox.value != ""){
      newskill.push(this.refs.textBox.value);}
    this.setState({skill: newskill}, () => {
      var skills = {
        skills: this.state.skill
      }
      axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
      .then(()=>{
          axios.post('/updateSkills' , skills, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
          .then(result => {
             console.log(result)
          }).catch(err => {
              console.log(err)
          })
      }).catch(()=>{
          console.log()
      })
    })
  }
  componentDidMount() {
    axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
    .then(()=>{
        axios.get('/profile' ,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result => {
            this.setState({user:result.data.profile,imagePath:result.data.profile.userImage, country: result.data.country, value: result.data.profile.description, skill: result.data.profile.skills})
           console.log(result.data.profile)
        }).catch(err => {
            console.log(err)
        })
    }).catch(()=>{
        localStorage.removeItem("TokenInfo");
        localStorage.removeItem("Authentication");
        this.props.history.push("/login");
    })
}
  

  editDescription = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  updateDescription= () => {
    this.setState({
        isInEditMode: false,
        value: this.refs.description.value
    }, () => {
      var desc = {
        description: this.state.value
      }
      axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
      .then(()=>{
          axios.post('/updateDesc' , desc, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
          .then(result => {
             console.log(result)
          }).catch(err => {
              console.log(err)
          })
      }).catch(()=>{
          console.log()
      })
    })
    
    
  }

  deleteitem(s){
    const newskill = this.state.skill.filter(a => {
      return (a !== s)
    })
    this.setState({
      skill:newskill
    } , () => {
      var skills = {
        skills: this.state.skill
      }
      axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
      .then(()=>{
          axios.post('/updateSkills' , skills, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
          .then(result => {
             console.log(result)
          }).catch(err => {
              console.log(err)
          })
      }).catch(()=>{
          console.log()
      })
    })
  }

  renderEditView(){
    return (
        <div>
            <textarea rows="6" cols="70" defaultValue={this.state.value} ref="description"/> 
            <Button onClick={this.updateDescription} style={{backgroundColor: "#f2bb13", padding: "0.5%", margin: "1%"}}> OK </Button>
        </div>)
  }

  renderDefaultView(){
    return (
      <div> {this.state.value} </div>)
  }

  render(){
    var skills = this.state.skill.map((s, i) => {
            return (<li><Button style={{backgroundColor: "#252e38", padding:"0"}} onClick={(e) => this.deleteitem(s)}> <i class="yellow large minus circle icon"></i></Button><span className={classes.item}>{s}</span></li>);
        });
    
    return(
      <div className = {classes.body}>
      <div className={classes.main}>
        <div className={classes.output}>
        <div className={classes.card}>
        <img src = {this.state.imagePath} />
        <Form onSubmit={this.onSubmit}>
          <Input  type="file" required className="userImage" name="image" onChange={this.fileSelectHandler} /> 
          <br/>
          <Button size={"large"} type="submit"   color="blue" className="profileButton">Upload Image</Button>
        </Form>
        </div>
        <div className={classes.desc}>
          <p className={classes.name}>{this.state.user.firstname}</p>
          <img src={this.state.country.imgurl}/> &nbsp;
           {this.state.country.name}
    
          <p className={classes.points}> Total Points: <span className={classes.score}>{this.state.user.points}</span> </p>
        </div>
        <div className={classes.prof}>
          <h3>Description <Button icon style={{backgroundColor: "#f2bb13", padding: "0.5%", margin: "1%"}} onClick= {(event) => {this.editDescription()}}><i class="edit icon"></i></Button></h3>
          {this.state.isInEditMode ? this.renderEditView(): this.renderDefaultView()}

          <h3>Skills</h3>
          <input type="text" placeholder="Add a new skill" id="addskill" ref="textBox"/> <Button style={{backgroundColor: "#f2bb13", padding: "0.5%", margin: "1%"}} onClick= {(event) => {this.addskill();}}><i class="plus icon"></i> </Button>  
      
          <p><ul>
            {skills}
          </ul></p>
        
        </div>

      <div className={classes.prof}>

          <h3>Points:</h3>
          <p>Easy: <span className={classes.score}>{this.state.user.EasyPoints} </span></p>
          <div>
            <Progress  percent={this.state.user.EasyPoints}  color='orange'  />
          </div>


          <p>Medium: <span className={classes.score}>{this.state.user.MediumPoints}</span></p>
            <div>
             <Progress  percent={this.state.user.MediumPoints}  color='yellow'  />
            </div>
       
          

          <p>Hard: <span className={classes.score}>{this.state.user.HardPoints}</span></p>
          <div>
           <Progress  percent={this.state.user.HardPoints} color='brown' />
          </div>
          

                  
      </div>
    </div>
    </div>
    <Footer />
  </div>  


    )
  }
}

export default Profile;
