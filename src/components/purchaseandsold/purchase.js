import React,{Component} from 'react';
import firebase from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
            <Button style={styles.fontColor} onClick={props.purchaseproduct} >Purchase Product</Button>
            <Button style={styles.fontColor} onClick={props.auctioneer}> Auctioneer </Button>
            <Button style={styles.fontColor} onClick={props.logOut}>Log Out</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }


export default class Purchase extends Component{
    constructor(){
        super();
        this.state={
            data : []
        }
    }
    purchaseproduct(){
        this.props.history.push('/purchase')
      }
      auctioneer(){
        this.props.history.push('/auctioneer')
      }
      logOut(){
        firebase.auth().signOut();
        this.props.history.push('/');
      }
      componentDidMount(){
            firebase.database().ref(`/purchaseproduct/`).on('value', snap =>{
                let item = snap.val();
                let UID = firebase.auth().currentUser.uid;
                console.log(UID);
                let array= [];
                for(var key in item){
                    let data = item[key];
                    if(key === UID){
                        for(var key1 in data){
                            console.log(key1, data[key1]);
                            array.push({key , key1 , data : data[key1]});
                        }
                        this.setState({data: array})
                       
                    }
                   
                }
            })
      }
    render(){
        return(
            <div>
                <ButtonAppBar purchaseproduct={()=>this.purchaseproduct()} auctioneer={() => this.auctioneer()} logOut={() => this.logOut()}/>
                <br/>
                <div style={{display:'inline-flex'}} >
                {
                    this.state.data ?
                    this.state.data.map((text,index) => {
                        return(
                            <Card key ={index}>
                                <CardHeader title={text.data.type} subheader={text.data.date} />
                                <CardMedia
                                    style={{height: 250, width: 250 }}
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
                    : ''
                }
                </div>
            </div>
        );
    }
}