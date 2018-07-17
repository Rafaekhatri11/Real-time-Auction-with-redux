import React,{Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
    color: '#F1C40F'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  appBarColor: {
    backgroundColor: '#3F3F3F',
    width: '100%',
    opacity: 0.9,
    borderBottom: '2px solid #F1C40F',
  },
  fontColor: {
    color: 'white',
    backgroundColor: '#F1C40F',
    fontWeight: 'bold',
    fontSize: 14,
    marginRight:10
  },
  authColor: {
    color: '#F1C40F',
    fontWeight: 'bold',
    fontSize: 14,

  },
  textField: {
    color:'black',
   
   },
   table: {
    minWidth: 500,
  },
};


function ButtonAppBar(props) {
 
    return (
      <div style={styles.root}>
        <AppBar position="static" style={styles.appBarColor}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={styles.flex}>
              Products
            </Typography>
            <Button style={styles.fontColor} onClick={props.soldproduct} >Sold Product</Button>
            <Button style={styles.fontColor} onClick={props.auctioneer}> Auctioneer </Button>
            <Button style={styles.fontColor} onClick={props.logOut}>Log Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }


export default class Sold extends Component{
  constructor(){
    super();
    this.state={
      data : []
    }
  }
    componentDidMount(){

       let UID= firebase.auth().onAuthStateChanged( user =>{
        console.log(user.uid);
        UID = user.uid;
       })
       firebase.database().ref(`/soldproduct/`).on('value',snap =>{
         let data = snap.val();
         let array = [];
         for(var key in data){
           let newdata = data[key];
           if(key === UID){
             for(var key1 in newdata){
              array.push({key , key1 , data : newdata[key1]});
             }
             this.setState({ data : array});
           }
         }
       })
    
    }

    soldproduct(){
      this.props.history.push('/sold')
    }
    auctioneer(){
      this.props.history.push('/auctioneer')
    }
    logOut(){
      firebase.auth().signOut();
      this.props.history.push('/');
    }
    render(){
      console.log(this.state.data);
        return(
            <div>
               
                <ButtonAppBar soldproduct={() => this.soldproduct()} auctioneer={()=> this.auctioneer()} logOut={()=> this.logOut()}/>
                <div style={{display:'inline-flex'}}>
                {
                  this.state.data != null ?
                    this.state.data.map((text,index) => {
                        return(
                         
                            <Card key ={index}>
                                <CardHeader title={text.data.type} subheader={text.data.date} />
                                <CardMedia
                                    style={{height: 250, width: 350 }}
                                    image={text.data.imageurl}
                                      />
                                <CardContent>
                                    <Typography>
                                        Description
                                    </Typography>
                                    <Typography>
                                    {text.data.Description}
                                    </Typography>
                                    <Typography>
                                        amount
                                    </Typography>
                                    <Typography>
                                    {text.data.amount}
                                    </Typography>
                                </CardContent>
                            </Card>

                        
                          
                        )  
                    }) 
                 :''
                }
                  </div>
            </div>
        );
    }
}