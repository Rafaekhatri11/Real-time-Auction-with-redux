import React,{Component} from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {falseTheFlag} from '../store/Action/action';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
// import SimpleBottomNavigation from '../root/bottomNav';
// import { black } from 'material-ui/styles/colors';
import "./style.css"
const styles = {
    root: {
      flexGrow: 1,
    },
    authColor:{       
        color: 'white',
        backgroundColor: '#F1C40F',
        fontWeight: 'bold',
        fontSize: 14,
        marginRight:15
       
    }, appBarColor:{
        backgroundColor: '#3F3F3F',
        width:'100%',
        opacity: 0.9,
        borderBottom: '2px solid #F1C40F'
    },
    buttonstyle:{
        width:  600,
        height: 500,
        fontFamily:'Merlin',
        fontSize: 60,
        backgroundColor:'#F1C40F',
        color:'white',
        border:'1px solid black'
    }
  };

class Home extends Component{
    // constructor(){
    //     super();
    // }
    componentWillMount(){
        console.log('props are ');
    }
    logOut(){
        let flag = 'false';
        firebase.auth().signOut();
        this.props.falseTheFlag(flag);
        this.props.history.push('/');
    }

    routeToAuction(){
        this.props.history.push("/auctioneer");
    }
   

    routeToBid(){
        this.props.history.push("/bidder");
    }

    routeToMyProduct(){
        this.props.history.push("/myproduct");
    }
    render(){
        return(
            <div>       
                <SimpleAppBar logOut={()=>this.logOut()} myproductList={() => this.routeToMyProduct()} />
                <div style={{paddingLeft: '10%' ,display:'inline-flex',marginTop: 40}} >
                    <Button style={styles.buttonstyle} variant="outlined" onClick={() => this.routeToAuction()}> Auctioneer </Button>
                    <br/>
                    <Button  style={styles.buttonstyle} variant="outlined" onClick={() => this.routeToBid()}> Bidder </Button>
                </div>
                {/* <SimpleBottomNavigation /> */}
            </div>
        )
    }
}


function mapStateToProps(state){
    return{
        falseTheFlag : state.root.userSignIn,
       // falseTheFlag: state.root.userSignUp
    }
}

function mapDispatchToProps(dispatch){
    return{
        falseTheFlag : (flag) => {dispatch(falseTheFlag(flag))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);

function SimpleAppBar(props) {
    
    return (
      <div style={{flexGrow: 1,}}>
        <AppBar position="static" style={styles.appBarColor}>
          <Toolbar>
              <div style={{marginLeft: '80%',padding: 20 ,display:'inline-flex'}}>
          <Button style={styles.authColor} onClick={props.myproductList} id="mybutton"> 
              Product List 
          </Button>
          <Button style={styles.authColor} onClick={props.logOut} id="mybutton" >
              Log Out 
          </Button>
        
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  

  
   withStyles(styles)(SimpleAppBar);