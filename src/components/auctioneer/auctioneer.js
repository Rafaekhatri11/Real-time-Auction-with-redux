import React,{Component} from 'react';
import firebase from 'firebase';
import {sendProductDetails ,falseTheFlag} from '../store/Action/action';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SimpleBottomNavigation from '../root/bottomNav';
import Paper from '@material-ui/core/Paper';
import {image} from 'react-icons-kit/icomoon/image';
import {Icon} from 'react-icons-kit';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import DatePicker from 'material-ui/DatePicker';
import {connect} from 'react-redux';
import TextField1 from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';

function SimpleAppBar(props) {
    return (
      <div style={{flexGrow: 1 }}>
        <AppBar position="static" style={styles.appBarColor}>
          <Toolbar>
              <div style={{marginLeft: '78%',display:'inline-flex'}}>
          <Button style={styles.authColor} onClick={props.routeToSold}> 
                Sold
          </Button>
          <Button style={styles.authColor} onClick={props.routeToBidder} >
             Bidder 
          </Button>
          <Button style={styles.authColor} onClick={props.logOut} >
              Log Out 
          </Button>
        
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
  

  
   withStyles(SimpleAppBar);

   const ranges = [
    {
      value: 'mobile',
      label: 'MOBILE',
    },
    {
      value: 'refrigerator',
      label: 'REFRIGRATOR',
    },
    {
      value: 'lcd',
      label: 'LCD',
    },
    {
        value: 'others',
        label: 'OTHERS'
    }
  ];

  
const styles = {
    root: {
      flexGrow: 1,
    },
    authColor:{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
        background: '#F1C40F',
        marginRight: 10
       
    }, appBarColor:{
        backgroundColor: '#3F3F3F',
        width:'100%',
        opacity: 0.9,
        borderBottom: '2px solid #F1C40F',
         paddingRight:'10%'
    },
    buttonstyle:{
        width:  600,
        height: 200
    } ,
    paperStyle:{
        height: 500,
        width: 700,
        margin:"auto",
        marginTop:'7%',
        borderRadius: '10px 10px 10px 10px'
    }
  };

class Auctioneer extends Component{
    constructor(){
        super();
        this.state={
            name: '',
            productdes: '',
            time: '',
            bidamount: '',
            selectedFile: null,
            todaydate :null,
            dateformat : '',
            timeInMillisecond: null,
            todayTime: null,
            weight:"",
            currenetMonth : "",
            currentDate: '',
            currentYear:'',
            conditionforhour :''
        }
    }
    componentWillMount(){
        console.log('props are ');
    }
    logOut(){
        let flag = 'false';
        firebase.auth().signOut();
        this.props.falseTheFlag(flag);
        this.props.history.push('/');
    }
   
    routeToBidder(){
        this.props.history.push('/bidder');
    }

    routeToSold(){
        this.props.history.push('/sold');
    }
    fileSelectedHandler = (evt) => {
            
        console.log(evt.target.files[0]);
        this.setState({selectedFile: evt.target.files[0]});
    }

    handleChange (evt) {
        this.setState({ weight: evt.target.value });
      
      };

    handleChangeDate = (event, date) => {
            
            
        let currentDate = date.getDate();
        let currentMonth= date.getMonth();
        currentMonth++;
        let currentYear = date.getFullYear();
        let finalDate = currentYear+ '-0'+ currentMonth +'-'+currentDate;
        console.log(finalDate);


        this.setState({
            todaydate: date,
            dateformat : finalDate,
            currenetMonth : currentMonth,
            currentDate: currentDate,
            currentYear:currentYear
        });
        
    }; 



    TimePicker = (event, date) => {
        let currentHour= date.getHours();
        let currentMinute= date.getMinutes();
        let hour = currentHour*60*60*1000+currentMinute*60*1000;
        console.log("This is user time "+hour);
        // let finalTime = currentHour + ":"+currentMinute;
        console.log(hour);
        this.setState({time: hour ,
            todayTime: date,
            conditionforhour: currentHour
        });
    };


    sendImageAndDataToFirebase(evt){
        evt.preventDefault();
      
        let Time = new Date();
        let hour = Time.getHours();
        let minutes = Time.getMinutes();
        let totalTime = hour*60*60*1000+minutes*60*1000;
        let minimumTime = hour*60*60*1000+ 10*60*1000;
        let CurrDate = new Date();
        let date = CurrDate.getDate();
        let month= CurrDate.getMonth() + 1;
        let year = CurrDate.getFullYear();
     //   console.log(date,month,year);
        console.log(this.state.time,minimumTime);
       if(this.state.selectedFile === null || this.state.weight === '' || this.state.name ==='' || this.state.productdes === '' || this.state.todaydate === "" || this.state.todayTime === "" || this.state.bidamount === ''){
           alert('please fill all the fields');
       }
        else if(this.state.time < totalTime ) {
            alert('please  select correct time');
        }
        
        else if(this.state.time <= minimumTime){
            alert('please select maximum 10 mints time');
        }
        else if(this.state.selectedFile === null){
            alert('You have no selected an image');
        }
        else if(this.state.currentDate < date || this.state.currenetMonth <month || this.state.currentYear < year){
            alert('please select correct date..');
        }
        else if(this.state.bidamount <=100){
            alert('Minimum bid amount is 100 for any product');
        }
        else{
            console.log(firebase.auth().currentUser.uid)
            let fullDetail={
                categoryType: this.state.weight,
                productName: this.state.name,
                productDescription: this.state.productdes,
                date : this.state.dateformat,
                time: this.state.time,
                bidamount: this.state.bidamount,
                UID: firebase.auth().currentUser.uid
            }
            this.props.sendProductDetails(fullDetail,this.state.selectedFile);
            this.setState({
                name: '',
                productdes: '',
                time: '',
                bidamount: '',
                selectedFile: null,
                todaydate :null,
                dateformat : '',
                timeInMillisecond: null,
                todayTime: null,
                weight:"",
                currenetMonth : "",
                currentDate: '',
                currentYear:''
            })
        }
    }
    render(){
     
        return(
            <div>       
                <SimpleAppBar logOut={()=>this.logOut()} routeToBidder={() => this.routeToBidder()} routeToSold={() => this.routeToSold()} />
               
                <Paper style={styles.paperStyle}>
                    <h2 style={{paddingLeft:'40%'}}>Enter Product</h2>
                    <div style={{display: "inline-flex" ,width: '100%'}}> 
                        <div style={{paddingLeft:'5%'}}>
                            <Card style={{backgroundColor:'black'}}>
                            <CardMedia style={{height:200,width: 250 ,border: '2px dotted white',
                            borderRadius: '10px 10px 10px 10px',textAlign:"center"}}> 
                                {
                                    this.state.selectedFile === null     ?
                                        <Icon icon={image} size={200} style={{color: '#F1C40F' }}/> :
                                        <img src={require("../pictures/"+this.state.selectedFile.name)} alt={this.state.selectedFile.name}
                                        width="200" height="190" />
                                        
                                }
                                   
                            </CardMedia>
                            
                             <input type="file" onChange={this.fileSelectedHandler} />
                             </Card>
                        </div>

                        <div>
          <TextField1
          select   
          style={{marginLeft:'25%',marginRight:'20%'}}
          value={this.state.weight}
          onChange={(evt) => this.handleChange(evt)}
         
          InputProps={{
            startAdornment:<InputAdornment> Category</InputAdornment> ,
            
          }}
       
        >
          {ranges.map(option => (
              
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField1>

                                 <TextField hintText="Name" inputStyle={{color:'black'}} floatingLabelFocusStyle={{color:'black'}}
                                 underlineFocusStyle={{borderColor:'black'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                 onChange={(evt) => this.setState({name:evt.target.value})} value={this.state.name}
                                  floatingLabelText="Name"  /> <br/>

                                  <TextField hintText="Description" inputStyle={{color:'black'}} floatingLabelFocusStyle={{color:'black'}}
                                 underlineFocusStyle={{borderColor:'black'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                 onChange={(evt) => this.setState({productdes:evt.target.value})} value={this.state.productdes}

                                 floatingLabelText="Description" /> <br/><br/>
                                 
                                  <DatePicker hintText="Controlled Date Input" mode="landscape"
                                        onChange={this.handleChangeDate} style={{marginLeft:'25%',marginRight:'20%'}} 
                                        value={this.state.todaydate} inputStyle={{color:'black'}}
                                    /> <br />

                                      <TimePicker inputStyle={{color:'black'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                    hintText="12hr Format" onChange={this.TimePicker}  value={this.state.todayTime}
                                   
                                    /> 

                                  <TextField hintText="Bid amount" inputStyle={{color:'black'}} floatingLabelFocusStyle={{color:'black'}}
                                 underlineFocusStyle={{borderColor:'black'}} style={{marginLeft:'25%',marginRight:'20%'}}
                                 onChange={(evt) => this.setState({bidamount:evt.target.value})} value={this.state.bidamount}
                                 floatingLabelText="Bid amount" /> <br/>


                                 <Button onClick={(evt) => this.sendImageAndDataToFirebase(evt)} style={{marginLeft:'25%'
                                 ,background:"#F1C40F", color:'black',fontWeight:'bold',border:'1px solid black'}}>
                                  Submit </Button>
                        </div>
                   </div>
                </Paper> 
                <br/><br/>
                <SimpleBottomNavigation />
            </div>
        )
    }
}



function mapStateToProps(state){
    return{
       productData : state.root.productData
}   
}

function mapDispatchToProps(dispatch){  
    return{
        sendProductDetails : (fullDetail,myfile) => {dispatch(sendProductDetails(fullDetail,myfile))},
        falseTheFlag : (flag) => {dispatch(falseTheFlag(flag))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auctioneer);




