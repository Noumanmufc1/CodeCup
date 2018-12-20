import React from 'react';
import {Segment,Container,Grid,Header,pst,Item} from 'semantic-ui-react';
import classes from './Footer.css'
const footer = ()=>{
    return(
			<Segment inverted={true} vertical={true} > 
				<Container>
					<Grid stackable={true} inverted={true} divided={true} >  
						<Grid.Column width={5}>
							<p style={{fontSize:'200%', margin:'5px'}}><span style={{color:'#f2bb13'}}>Code</span><span style={{color: 'white'}}>Cup</span></p>
						</Grid.Column>

						<Grid.Column width={5}>
							<Header as='h4' textAlign={"center"} inverted={true}>About</Header>
							<br />
							<div>		
								<p style={{fontSize: '20px', textAlign:'center'}}><span style={{color:'grey'}}>©2018 Copyright </span> <span style={{color: 'white',fontSize: '20px'}}> CodeCup.com </span></p>
							</div>
						</Grid.Column>
						
						<Grid.Column width={5}>
							<Header as='h4' textAlign={"center"} inverted={true}>Copyrights</Header>
							<p className={classes.para}><img src="https://stickeroid.com/uploads/pic/full-pngimg/ad119daf9f7711db47344d4d6cdb9576433bc134.png" width="50px" height="50px" /></p>
							<p className={classes.para}><img src="https://diylogodesigns.com/wp-content/uploads/2016/05/instagram-Logo-PNG-Transparent-Background-download-768x768.png" width="50px" height="50px" /></p>
							<p className={classes.para}><img src="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c53e.png" width="50px" height="50px" /></p>
							
						</Grid.Column>
				</Grid>
				</Container>
		</Segment>

    )
}
export default footer;