import React, { Component } from 'react';
import _ from 'lodash'
import classes from './profile.css'
import { Button, Progress, Form, Input} from 'semantic-ui-react'
import axios from 'axios'
import Footer from '../../components/Footer/Footer'
class Profile extends Component {
  //calling the constructor and defining the state for the component
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
      imagePath: '',
      loading: false
    };
  }

  //submit handler for the profile image
  onSubmit = (e) =>{
    e.preventDefault();
    this.setState({
      loading: true
    })
    const fd = new FormData();
   
    fd.append('image',this.state.image,this.state.image.name);

    axios.post('/profileImage',fd,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
    .then(result=>{

        axios.get('/profile', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(result=>{
            this.setState({
                imagePath:result.data.profile.userImage,
                loading:false
            });  
        })
        .catch(error=>{
            localStorage.removeItem("TokenInfo");
            localStorage.removeItem("Authentication");
            this.props.history.replace('/login');
        })
    })
    .catch(error=>{
        this.setState({
            loading:false
        })
    })
  }


  //setting the image depending on the image selecteds
  fileSelectHandler = (event) =>{
      this.setState({
          image:event.target.files[0]
      }) 
  }

  //adding any skills the user adds to the database
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

  //fetching the initial data from the database
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
  
  //changing state if description is editing 
  editDescription = () => {
    this.setState({
      isInEditMode: !this.state.isInEditMode
    })
  }

  //updating description in the webpage
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

  //deleting items from the skills in the database
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

  //rendering the textarea for editing the description
  renderEditView(){
    return (
        <div>
            <textarea rows="6" cols="30" defaultValue={this.state.value} ref="description"/> 
            <Button onClick={this.updateDescription} style={{backgroundColor: "#f2bb13", padding: "0.5%", margin: "1%"}}> OK </Button>
        </div>)
  }

  //rendering default view for showing description
  renderDefaultView(){
    return (
      <div> {this.state.value} </div>)
  }

  render(){
    //mapping each button into a button with a delete option
    var skills = this.state.skill.map((s, i) => {
            return (<li><Button style={{backgroundColor: "#252e38", padding:"0"}} onClick={(e) => this.deleteitem(s)}> <i class="yellow large minus circle icon"></i></Button><span className={classes.item}>{s}</span></li>);
        });
    
    return(
      <div className = {classes.body}>
        <div className={classes.main}>
          <div className={classes.output}>
            <div className={classes.card}>
              <img src = {this.state.imagePath} />
              <div >
                <Form onSubmit={this.onSubmit}>
                  <Input style={{marginLeft:'8%'}} type="file" required className="userImage" name="image" onChange={this.fileSelectHandler} /> 
                  <br/>
                  <Button style={{marginLeft:'28%', marginTop:'5%', marginBottom:'5%'}}size={"large"} type="submit"   color="blue" className="profileButton">Upload Image</Button>
                </Form>
              </div>
            </div>
            <div className={classes.desc}>
              <p className={classes.name}>{this.state.user.firstname}</p>
              <img src={this.state.country.imgurl}/> &nbsp; {this.state.country.name}
              <p className={classes.points}> Total Points: <span className={classes.score}>{this.state.user.points}</span> </p>
              <h3>Description <Button icon style={{backgroundColor: "#f2bb13", padding: "0.5%", margin: "1%"}} onClick= {(event) => {this.editDescription()}}><i class="edit icon"></i></Button></h3>
              {this.state.isInEditMode ? this.renderEditView(): this.renderDefaultView()}
            </div>
            <div className={classes.prof}>
              <h3>Skills</h3>
              <input type="text" placeholder="Add a new skill" id="addskill" ref="textBox"/> <Button style={{backgroundColor: "#f2bb13", padding: "0.5%", margin: "1%"}} onClick= {(event) => {this.addskill();}}><i class="plus icon"></i> </Button>  
              <p><ul>{skills}</ul></p>
            </div>
            <div className={classes.prof}>
              <h3>Points:</h3>
              <p>Easy: <span className={classes.score}>{(this.state.user.EasyPoints > 99) ? 100: this.state.user.EasyPoints} </span></p>
              <div>
                <Progress  percent={this.state.user.EasyPoints}  color='orange' autoSuccess />
              </div>
              <p>Medium: <span className={classes.score}>{(this.state.user.MediumPoints > 99) ? 100: this.state.user.MediumPointsPoints} </span></p>
              <div>
                <Progress  percent={this.state.user.MediumPoints}  color='yellow'  autoSuccess/>
              </div>
              <p>Hard: <span className={classes.score}>{(this.state.user.HardPoints > 99) ? 100: this.state.user.HardPoints} </span></p>
              <div>
                <Progress  percent={this.state.user.HardPoints} color='brown' autoSuccess/>
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
