import React ,{Component} from 'react';
import './style.css';
import { Paper, Button } from '@material-ui/core';
import {user} from 'react-icons-kit/icomoon/user'
import {Icon} from 'react-icons-kit';
import {userSignIn} from '../store/Action/action';
import {connect} from 'react-redux';
import LinearIndeterminate from './progress';
import SimpleAppBar from '../root/navigation';
import TextField from 'material-ui/TextField';
import SimpleBottomNavigation from '../root/bottomNav';
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
           color:'white'
          },
          container: {
            display: 'flex',
            flexWrap: 'wrap',
          },
         
    
}










 class Login extends  Component{
    constructor(){
        super();
        this.state ={
            name: '',
            loader : true,
            Username:'',
            password:'',
         
        }
    }
    componentWillReceiveProps(nextProps){
        console.log( 'recieve props' ,   nextProps);
       
        firebase.auth().currentUser ?
            this.props.history.push('/mainpage')
            : '';
    
       
    }
    
    pressTheLogin(para){
       para.preventDefault();
   //    console.log( 'props is equal to ' , this.state.nextprop)

       let userInfo = {
           email : this.state.Username,
           password : this.state.password
       };
        this.setState({loader: false});
        console.log(this.state.Username,this.state.password);
        if(this.state.Username === "" || this.state.password === ""){
            alert('Please fill up all the fields');
        }
        else {
        this.props.userSignIn(userInfo)
        setTimeout(() => {
        
            this.setState({loader : true});
             } , 2000);
            }
    }


        render(){
            return(
                <div id="backgroundImage">
                    <SimpleAppBar/>
                    <h1>Log In page</h1>
                    <Paper style={styles1.paper}>
                            <Icon size={"50%"} icon={user} style={styles1.iconstyle}/>
                             
                            <form onSubmit={(para)=>this.pressTheLogin(para)} > 
                                <TextField hintText="Username" inputStyle={styles1.textField} floatingLabelFocusStyle={{color:'yellow'}}
                                 underlineFocusStyle={{borderColor:'yellow'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                 onChange={(evt)=>this.setState({Username: evt.target.value})} value={this.state.Username}
                                 floatingLabelText="Username" /> <br/>
                                <TextField hintText="Password" inputStyle={styles1.textField} floatingLabelFocusStyle={{color:'yellow'}}
                                underlineFocusStyle={{borderColor:'yellow'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                onChange={(evt)=>this.setState({password: evt.target.value})} value={this.state.password}
                                 floatingLabelText="Password" type="password"/> <br/><br/>

                                 {
                                     this.state.loader ?
                                 <Button variant="contained" color="primary" type="submit"
                                 style={{background: '#F1C40F' ,fontWeight:'bold',width:400,border: '2px solid #F1C40F',
                                 borderRadius:15,marginLeft: '10%', marginRight: '10%'}}>
                                     Log In
                                 </Button> :
                                 <LinearIndeterminate />
                                 }
                            </form>
                     </Paper>
                     <SimpleBottomNavigation />
                </div>

            );
        }
}




function mapStateToProps(state){
    console.log(state);
    return{
        userSignIn: state.root.userSignIn
    }
}

function mapDispatchToProps(dispatch){
    return{
        userSignIn : (userInfo) => {dispatch(userSignIn(userInfo))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)