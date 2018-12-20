import React, { Component } from 'react';
import classes from './leaderboard.css';
import axios from 'axios';
import Footer from '../../components/Footer/Footer'

class LeaderBoard extends Component {
	//defining the state for the component
	state  = {
		users: []
	}

	//defining a compare function to sort the users on the basis of their pointss
	compare = (a, b) => {
		const A = a.points;
		const B = b.points;
		
		let comparison = 0;
		if (A > B) {
		  comparison = -1;
		} else if (A < B) {
		  comparison = 1;
		}
		return comparison;
		}
		
	//fetching the data from the database
	componentWillMount () {
		axios.get("/middleware",{ headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
		.then(()=>{
			axios.get('/leaders', { headers: {"Authorization" : `Bearer ${localStorage.getItem("Token")}`} })
			.then(result => {
				this.setState({users:result.data.users.sort(this.compare)})	
			})
			.catch(err => {
				console.log(err)
			})
		})
		.catch(() => {
			localStorage.removeItem("TokenInfo");
      localStorage.removeItem("Authentication");
      this.props.history.push("/login");
		})
	}

	//returning the data for a specific index
	getData = (i) => {
		if(this.state.users.length > i) {
			return ( 
				<tr className={classes.cell}>
					<td className={classes.cell}>{i+1}</td>
					<td className={classes.cell}><img src={this.state.users[i].country.imgurl} className={classes.flag} /></td>
					<td className={classes.cell}>{this.state.users[i].firstname + ' ' + this.state.users[i].lastname}</td>
					<td className={classes.cell}> 
						<div class="progress">
							<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: String(this.state.users[i].points) + '%'}}>
							</div>
						</div>
					</td>
					<td className={classes.cell}>{this.state.users[i].points}</td>
				</tr> 
				)
		} else {
			return
		}
		
	}

  render() {
    return(
	<div className={classes.body}>
      <div className={classes.main}>
		<div className = {classes.output}>
          <div className={classes.heading}>
				    <p className={classes.aimPara}>LeaderBoard</p>
			    </div>
			<div className={classes.board}>
				<table className={classes.table}>
				<tbody>
					<tr className={classes.head}>
						<th className={classes.cell}>Rank</th>
						<th className={classes.cell}>Country </th>
						<th className={classes.cell}>Name</th>
						<td className={classes.cell}>Progress Level</td>
						<th className={classes.cell}>Points</th>
					</tr>
					{this.getData(0)}
					{this.getData(1)}
					{this.getData(2)}
					{this.getData(3)}
					{this.getData(4)}
					{this.getData(5)}
					{this.getData(6)}
					{this.getData(7)}
					{this.getData(8)}					
					{this.getData(9)}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<Footer />
	</div>
    )
  }
}

export default LeaderBoard;
