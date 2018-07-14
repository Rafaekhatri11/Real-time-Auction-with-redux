import React ,{Component} from 'react';
import './style.css';
import { Paper, Button } from '@material-ui/core';
import {userPlus} from 'react-icons-kit/icomoon/userPlus'
import {Icon} from 'react-icons-kit';
import {userAuthSignUp} from '../store/Action/action';
import {connect} from 'react-redux';
import SimpleAppBar from '../root/navigation';
import SimpleBottomNavigation from '../root/bottomNav';
import LinearIndeterminate from './progress';
import TextField from 'material-ui/TextField';
import firebase from 'firebase';
const styles1 = {
    
        paper : {
            height:500,
            width: 500,
            margin:'auto',
            opacity: 0.95,
            background: '#3f3f3f',
            paddingTop: '8%'
            
        } ,
        iconstyle:{
           color:'#F1C40F',
           paddingLeft:'30%',
           paddingRight:'30%'
        },
        textField: {
            color: 'white',
            
          },
          container: {
            display: 'flex',
            flexWrap: 'wrap',
          },
         
    
}





class SignUp extends  Component{
    constructor(){
        super();
        this.state ={
            name: '',
            loader : true,
            username:'',
            password:''
        }
    }
    componentWillReceiveProps(nextProps){
        console.log( 'component will recieve props ' ,nextProps);
        firebase.auth().currentUser ?
            this.props.history.push('/mainpage')
            : '';
    
    }

  
    pressTheLogin(para){
        para.preventDefault();
        this.setState({loader: false});
        let userDetails = {
            user : this.state.username,
            password: this.state.password,
            uname: this.state.name ,
            loader : this.state.loader
        }
        if(this.state.uname ==="" || this.state.username ==="" ||  this.state.password ===""){
            alert('Please enter all the fields');
            this.setState({loader: true})
         }

         else {
        console.log(this.state.name,this.state.username,this.state.password);
        this.props.userAuthSignUp(userDetails);
       
        setTimeout(() => {
        
            this.setState({loader : true});
             } , 2000);
            }
          
    }
        render(){
            return(
                <div id="backgroundImage">
                    <SimpleAppBar />
                    <h1>Sign Up page</h1>
                    <Paper style={styles1.paper}>
                            <Icon size={"50%"} icon={userPlus} style={styles1.iconstyle}/>
                           
                            <form  onSubmit={(para)=>this.pressTheLogin(para)}> 
                            <TextField hintText="Name" inputStyle={styles1.textField} floatingLabelFocusStyle={{color:'yellow'}}
                                 underlineFocusStyle={{borderColor:'yellow'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                 value={this.state.name}
                                 floatingLabelText="Name" onChange={(evt) => this.setState({name: evt.target.value})} /> <br/>


                                <TextField hintText="Email" inputStyle={styles1.textField} floatingLabelFocusStyle={{color:'yellow'}}
                                 underlineFocusStyle={{borderColor:'yellow'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                 value={this.state.username}
                                 floatingLabelText="Email" onChange={(evt) => this.setState({username: evt.target.value})}/> <br/>


                                <TextField hintText="Password" inputStyle={styles1.textField} floatingLabelFocusStyle={{color:'yellow'}}
                                underlineFocusStyle={{borderColor:'yellow'}} style={{marginLeft:'25%',marginRight:'20%'}} type="password"
                                value={this.state.password}
                                 floatingLabelText="Password" onChange={(evt) => this.setState({password: evt.target.value})}/> <br/><br/>


                                 {
                                     this.state.loader ?
                                 <Button variant="contained" color="primary" type="submit"
                                 style={{background: '#F1C40F' ,fontWeight:'bold',width:400,border: '2px solid #F1C40F',
                                 borderRadius:15,marginLeft: '10%', marginRight: '10%'}}>
                                     Sign Up
                                 </Button> :
                                 <LinearIndeterminate />
                                 }
                            </form>
                     </Paper>
                     <SimpleBottomNavigation/>
                </div>

            );
        }
}

function mapStatetoProp(state){
    return{
        userAuthSignUp : state.root.userSignUp
    }
}

function mapDispatchToProp(dispatch){

    return{
        userAuthSignUp: (userDetails) => {dispatch(userAuthSignUp(userDetails))}
    }
}


export default connect(mapStatetoProp,mapDispatchToProp)(SignUp);