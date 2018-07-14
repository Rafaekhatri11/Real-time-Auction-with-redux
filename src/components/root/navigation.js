import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import './style.css';
import {Link} from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1,
   // height: 500,
   
   
  },
  appBarColor:{
      backgroundColor: '#3F3F3F',
      width:'100%',
      opacity: 0.9
  },
  fontColor: {
      color : 'white',
      backgroundColor:'#F1C40F',
      fontWeight: 'bold',
      fontSize: 14,
    
      
  } ,
  authColor:{
      color: '#F1C40F',
      fontWeight: 'bold',
      fontSize: 14,
     
  }
};

function SimpleAppBar(props) {
  const { classes } = props;
  return (
      <div>
    <div className={classes.root} >
      <AppBar position="static" style={styles.appBarColor} >
        <Toolbar style={{marginLeft:"10%",marginRight:'10%'}}>
          <Typography variant="title" >
            <img  alt="Mainimage" style={{paddingTop:5}} height="55" width="90" src={require('./logo.png')} />
          </Typography>
          <Link to="/" style={{textDecoration:'none'}} > 
          <Button style={styles.fontColor}>
            Home
          </Button>
          </Link >
          <div style={{display:'inline-flex',marginLeft:'55%',marginRight:0}}>
         
          <Link to="/login" style={{textDecoration:'none'}}>
          <Button style={styles.authColor}>
              Log In 
          </Button>
          </Link>

         <Link to="/signup" style={{textDecoration:'none'}}>
          <Button style={styles.authColor}>
             Sign Up
          </Button>
          </Link>
          
            </div>
        </Toolbar>
       
      </AppBar>

      
    </div>

    
    </div>
  );
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);