import React, {Component} from 'react';
import classes from './coding.css'
import AceEditor from 'react-ace-editor';
import axios from 'axios';
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

class Coding extends Component {
    //calling the constructor and setting the state for the component
    constructor() {
        super()
        this.onChange = this.onChange.bind(this);
        this.state = {
            code:'',
            output: '',
            challenge: {},
            result: '',
            results: '',
            modalOpen: false,
            message: 'Sorry. You got this wrong. Try again.',
            result1: false,
            loadingRun: false,
            loadingSubmit: false,
        }
    }

    //defining handlers for the popup
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    //getting the data from the database for the specific challenge
    componentWillMount() {
        axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
        .then(()=>{
            axios.get('/challenges/' + this.props.match.params.id,{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
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

    //sending the request to the backend for compilation of the code
    onClick = (e) => {
        e.preventDefault()
        this.setState({
            loadingRun:true
        })
        var data = {
            code: this.state.code,
            testcases: this.state.challenge.testcases
        }
        var output;
        axios.post('/compile', data)
        .then((result) => {
            if(result.status === 200) {
                output = result.data.stdout;
            }
            this.setState({output}, () => {

                if(this.state.output) {
                    var html = ''
                    for(var i = 0; i < 1; i++) {
                        html += '<h4>Test Case' + String(i+1) + ':</h4><h6>Input:</h6><pre>'+ this.state.challenge.testcases[i] + '</pre>' + '<h6>Expected Output: </h6><pre>' + this.state.challenge.output[i] + '</pre><h6>Your Output:</h6><pre>' + this.state.output[i] + '</pre>'
                    }
                    this.setState({
                        loadingRun:false,
                        result: html
                    })
                } else {
                    var html = ''
                    for(var i = 0; i < 1; i++) {
                        html += '<h4>Test Case' + String(i+1) + ':</h4><h6>Input:</h6><pre>'+ this.state.challenge.testcases[i] + '</pre>' + '<h6>Expected Output: </h6><pre>' + this.state.challenge.output[i] + '</pre><h6>Your Output:</h6><pre>No input was given</pre>'
                    }
                    this.setState({
                        loadingRun:false,
                        result: html
                    })
                }
            })
        })		
        .catch(error	=>	{
            this.setState({
                loadingRun:false
            })
        })
        
    }
    
    //setting the code everytime it changes
    onChange(newValue, e) {
        const editor = this.ace.editor; // The editor object is from Ace's API
        this.setState({code:editor.getValue()}); // Outputs the value of the editor
    }

    genhtml(html, title=false) {
        if(title) {
            html = "<h1 style='color:#f2bb13'>" + html + "</h1>"
            return {__html: html}
        } else {
            return {__html: html}
        }
        
    }
    
    //sending the request to the backend for compilation of the code and checking it with the expected output 
    onSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loadingSubmit: true
        })
        var data = {
            code: this.state.code,
            testcases: this.state.challenge.testcases
        }
        var output;
        axios.post('/compile', data)
        .then((result) => {
            if(result.status === 200) {
                output = result.data.stdout;
            }
            this.setState({output}, () => {
                if(this.state.output) {
                    var html = ''
                    for(var i = 0; i < 1; i++) {
                        html += '<h4>Test Case' + String(i+1) + ':</h4><h6>Input:</h6><pre>'+ this.state.challenge.testcases[i] + '</pre>' + '<h6>Expected Output: </h6><pre>' + this.state.challenge.output[i] + '</pre><h6>Your Output:</h6><pre>' + this.state.output[i] + '</pre>'
                    }
                    this.setState({
                        loadingRun:false,
                        result: html
                    })
                } else {
                    var html = ''
                    for(var i = 0; i < 1; i++) {
                        html += '<h4>Test Case' + String(i+1) + ':</h4><h6>Input:</h6><pre>'+ this.state.challenge.testcases[i] + '</pre>' + '<h6>Expected Output: </h6><pre>' + this.state.challenge.output[i] + '</pre><h6>Your Output:</h6><pre>No input was given</pre>'
                    }
                    this.setState({
                        loadingRun:false,
                        result: html
                    })
                }
                if(this.state.output) {
                    var a = this.state.output
                    var b = this.state.challenge.output 
                    var bool = true; 
                    if(a.length == b.length){ 
                        for(var i = 0; i < a.length; i++) { 
                            if(a[i].trim() != b[i].trim()) {
                                bool = false 
                                break
                            }
                        }
                    } else {
                        bool = false
                    }
                }
                var points = {
                    points: this.state.challenge.points,
                    challengeId: this.props.match.params.id,
                    category: this.state.challenge.category + 'Points'
                }
                if(!this.state.output) {
                    this.setState({message: "You didn't enter any code", result1: false})
                }
                else if(bool) { 
                    var html = '<h4>Result: </h4><pre>Success</pre>'
                    this.setState({message: 'Congratulations. You earned ' + this.state.challenge.points + ' points', result1: true})
                    axios.post('/incPoints', points, { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`}})
                    .then(() => {
                        console.log('Points Added')
                    })
                    .catch(err => {
                        console.log(err)
                    })
        
                } else { 
                    var html = '<h4>Result: </h4><pre>Failure</pre>'
                    this.setState({message:'Sorry. You got this wrong. Try again.', result1: false})
                }
                if(this.state.output) {
                    for(var i = 0; i < 2; i++) {
                        html += '<h4>Test Case ' + String(i+1) + ':</h4><h6>Input:</h6><pre>'+ this.state.challenge.testcases[i] + '</pre>' + '<h6>Expected Output: </h6><pre>' + this.state.challenge.output[i] + '</pre><h6>Your Output:</h6><pre>' + this.state.output[i] + '</pre>'
                    }
                    this.setState({})
                    this.handleOpen()
                    this.setState({
                        results: html,
                        loadingSubmit:false
                    })
                } else {
                    for(var i = 0; i < 2; i++) {
                        html += '<h4>Test Case ' + String(i+1) + ':</h4><h6>Input:</h6><pre>'+ this.state.challenge.testcases[i] + '</pre>' + '<h6>Expected Output: </h6><pre>' + this.state.challenge.output[i] + '</pre><h6>Your Output:</h6><pre>No Input was given</pre>'
                    }
                    this.setState({})
                    this.handleOpen()
                    this.setState({
                        results: html,
                        loadingSubmit:false
                    })
                }
                
            })
        })		
        .catch(error	=>	{
            this.setState({
                loadingSubmit:false
            })
        })
       
    }
    render () {
        let button = null;
        let submitButton = false
        if(!this.state.loadingRun){	
            button =  <Button style={{float:'right'}} onClick={this.onClick}>Run</Button>
        }else{
            button = <Button  disabled={true} style={{float:'right'}} onClick={this.onClick}>Running...</Button>
        }
        let submit = 'Submit'
        if(!this.state.loadingSubmit) {
            submit = 'Submit'
            submitButton = false;
        } else {
            submit = 'Submitting...'
            submitButton = true
        }
        return (
            <div className={classes.body}>
                <div className = {classes.main}>
                    <div className={classes.input}>
			            <div className={classes.problem}>
                            <div className={classes.heading}>
                                <p className={classes.aimPara}>Challenge</p>
                            </div>
                            <div style={{color:'white', padding: '2.5%'}} dangerouslySetInnerHTML={this.genhtml(this.state.challenge.title, true)}></div>
                            <div style={{color:'white', padding: '2.5%'}} dangerouslySetInnerHTML={this.genhtml(this.state.challenge.description)}></div>
                        </div>
                        <div className={classes.code}>
                            <div className={classes.heading}>
                                <p className={classes.aimPara}>Code (Python 3)
                                {button}
                                <Modal
                                    trigger={<Button style={{float:'right'}} disabled={submitButton} onClick={this.onSubmit}>{submit}</Button>}
                                    open={this.state.modalOpen}
                                    onClose={this.handleClose}
                                    basic
                                    size='mini'
                                >
                                    <Header icon='browser' content={this.state.result1 ? 'Success' : 'Failure'} />
                                    <Modal.Content>
                                    <h3>{this.state.message}</h3>
                                    </Modal.Content>
                                    <Modal.Actions>
                                    <Button color={this.state.result1 ? 'green' : 'red' } onClick={this.handleClose} inverted>
                                        <Icon name='checkmark' /> Close Popup
                                    </Button>
                                    </Modal.Actions>
                                </Modal>
                                
                                 </p>
                            </div>      
                            <AceEditor
                                mode='python'
                                theme='terminal'
                                setReadOnly = {false}
                                onChange={this.onChange}
                                style={{ width: '100%', height: '87%' }}
                                ref={instance => ( this.ace = instance )} // Let's put things into scope
                            />
                        </div>
                    </div>
                    <div className={classes.results} >
                        <div className={classes.heading}>
                            <p className={classes.aimPara}>Output</p>
                        </div>
                        <div style={{color:'white', margin:'10px', padding: '2.5%'}} dangerouslySetInnerHTML = {this.genhtml(this.state.result)} ></div>
                    </div>
                    <div style={{float:"left"}} className={classes.output} >
                        <div className={classes.heading}>
                            <p className={classes.aimPara}>Results</p>
                        </div>
                        <div style={{color:'white', margin:'10px', padding: '2.5%'}} dangerouslySetInnerHTML = {this.genhtml(this.state.results)}></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Coding;