
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import firebase from 'firebase';
import { Icon } from 'react-icons-kit';
import { fetchTheData, appliedToJobs, ApplicantPerson, falseTheFlag } from '../store/Action/action';
import { connect } from 'react-redux';
import { mobile } from 'react-icons-kit/icomoon/mobile'
import { television } from 'react-icons-kit/fa/television';
import { iosInformation } from 'react-icons-kit/ionicons/iosInformation';
import { snowflakeO } from 'react-icons-kit/fa/snowflakeO';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogTitle } from '@material-ui/core';
import TextField from 'material-ui/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';


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
    marginRight: 10
  },
  authColor: {
    color: '#F1C40F',
    fontWeight: 'bold',
    fontSize: 14,

  },
  textField: {
    color: 'black',

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
          <Button style={styles.fontColor} onClick={props.routeToPurchase} >Purchase Product</Button>
          <Button style={styles.fontColor} onClick={props.routeToAuction}> Auctioneer </Button>
          <Button style={styles.fontColor} onClick={props.logOut}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}



withStyles(styles)(ButtonAppBar);

class BidMenubar extends Component {
  constructor() {
    super();
    this.state = {
      Products: [],
      productData: [],
      partiCularSelectedValue: '',
      personUID: '',
      personEmail: '',
      personAmount: '',
      open: false,
      open1: false,
      details: '',
      productUID: '',
      productName: '',
      productKey: '',
      imageurl:''

    }
  }
  handleClickOpen(text) {
    console.log(text);
    this.setState({
      open: true,
      personEmail: firebase.auth().currentUser.email.toString(),
      personUID: firebase.auth().currentUser.uid,
      productUID: text.UID,
      productName: text.Category,
      productKey: text.ProductID,
      imageurl : text.ImageURL
    })
  };

  handleClose() {
    this.setState({ open: false });
  };
  handleClose1() {
    this.setState({ open1: false });
  };
  logOut() {
    let flag = 'false';
    firebase.auth().signOut();
    this.props.falseTheFlag(flag);
    this.props.history.push('/');
  }

  routeToAuction() {
    this.props.history.push('/auctioneer')
  }
  routeToSold() {
    this.props.history.push('/sold')

  }
  routeToPurchase() {
    this.props.history.push('/purchase')

  }
  Applicants(text) {
    console.log(text);
    this.setState({ open1: true });
    let applicants = firebase.database().ref(`/auctioneer/${text.Category}/${text.UID}/${text.ProductID}/Bidder/`);
    // console.log(applicants)
    if (applicants) {
      let array = [];
      firebase.database().ref(`/auctioneer/${text.Category}/${text.UID}/${text.ProductID}/Bidder/`).on('value', snap => {
        let data = snap.val();
        for (var key in data) {
          array.push(data[key])
          console.log(array)
        }
        this.props.ApplicantPerson(array);

      })

    }
    else {
      alert('Nobody Applied Yet');
    }

  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged( user =>{
      this.setState({
        personUID: user.uid
      }) 
    })
    firebase.database().ref('/auctioneer/').on('value', snap => {
      let item = snap.val();
      let array = [];
      for (var key in item) {
        array.push({ product: key });
       
      }
      this.setState({
        Products: array
      })
      console.log(array);

    })

  }

  getParticularValue(text) {
    this.setState({ partiCularSelectedValue: text })
    this.props.fetchTheData(text);
    this.setState({ productData: this.props.getProductData.productData });

  }

  sendDataApplyForBid() {
    if (this.state.details === "" || this.state.personAmount === "") {
      alert('Please Enter empty fields');
    }

    else {
     
     
      let bidDetails = {
        UID: this.state.productUID,
        productKey: this.state.productKey,
        productName: this.state.productName,
        Email: this.state.personEmail,
        Description: this.state.details,
        Amount: this.state.personAmount,
        UserUID: this.state.personUID,
        imageURL: this.state.imageurl
      }
    //  this.setState({ open : false })
      this.props.appliedToJobs(bidDetails);
      this.setState({ open : false })
    }
  }
  render() {
    console.log(this.state.personUID);
    return (
      <div>
        <ButtonAppBar routeToAuction={() => this.routeToAuction()} logOut={() => this.logOut()} routeToPurchase={() => this.routeToPurchase()} />
        <div style={{ display: 'inline-flex', width: '100%' }}>

          <List style={{ backgroundColor: '#F1C40F', width: '20%', padding: 15, height: 800 }}>
            {
              this.state.Products.map((text, index) => {
                if (text.product === 'mobile') {
                  return (
                    <div key={index} onClick={() => this.getParticularValue(text.product)}
                      style={{ display: 'inline-flex', width: '100%', paddingTop: '2%' }}>
                      <Icon size={50} icon={mobile} />
                      <ListItem style={{ borderBottom: '1px solid black' }} >
                        {text.product}</ListItem>
                    </div>
                  );
                }
                if (text.product === 'lcd') {
                  return (
                    <div key={index} onClick={() => this.getParticularValue(text.product)}
                      style={{ display: 'inline-flex', width: '100%', paddingTop: '2%' }}>
                      <Icon size={50} icon={television} />
                      <ListItem style={{ borderBottom: '1px solid black' }}>{text.product}</ListItem>
                    </div>
                  );
                }

                if (text.product === 'refrigerator') {
                  return (
                    <div key={index} onClick={() => this.getParticularValue(text.product)}
                      style={{ display: 'inline-flex', width: '100%', paddingTop: '2%' }}>
                      <Icon size={50} icon={snowflakeO} />
                      <ListItem style={{ borderBottom: '1px solid black' }}>{text.product}</ListItem>
                    </div>
                  );
                }

                if (text.product === 'others') {
                  return (
                    <div key={index} onClick={() => this.getParticularValue(text.product)}
                      style={{ display: 'inline-flex', width: '100%', paddingTop: '2%' }}>
                      <Icon size={50} icon={iosInformation} />
                      <ListItem style={{ borderBottom: '1px solid black' }}>{text.product}</ListItem>
                    </div>
                  );
                }

              })
            }
          </List>


          <div>


            <div style={{ display: 'inline-flex', width: '100%', padding: '5%' }}>
              {this.props.getProductData.productData.map((text, index) => {
                return (
                  <div key={index} style={{ marginLeft: "5%" }} >
                    <Card>
                      <div style={{ margin: 10, float: 'right' }}>


                        <Button variant="outlined" onClick={() => this.Applicants(text)}>
                          Applicants
                           </Button>
                      </div> <br />
                      <CardHeader title={text.Name} subheader={text.Date} />

                      <img src={text.ImageURL} alt="pic" width="300" />
                      <CardContent>
                        <Typography>
                          {text.Description}
                        </Typography>
                        <div style={{ display: 'flex', width: '100%' }}>
                          <Typography>
                            Time: {text.Time}
                          </Typography>
                          <Typography style={{ paddingLeft: 50 }}>
                            Price: {text.Amount}
                          </Typography>
                        </div>
                      </CardContent>
                      <div style={{ paddingLeft: '30%', paddingRight: '25%' }}>
                        <Button variant="outlined" onClick={() => this.handleClickOpen(text)}
                          style={{ backgroundColor: '#F1C40F', fontWeight: 'bold' }}>
                          Apply Bid
                          </Button>
                      </div>
                      <br />
                    </Card>
                  </div>
                )
              })}

            </div>
          </div>
        </div>
        <Dialog
          open={this.state.open}
          onClose={() => this.handleClose()}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogTitle>Post your bid</DialogTitle>
          <DialogActions style={{ display: 'block' }}>

            <TextField hintText="Enter Some Description" inputStyle={styles.textField} floatingLabelFocusStyle={{ color: 'yellow' }}
              underlineFocusStyle={{ borderColor: 'yellow' }} style={{ marginLeft: '25%', marginRight: '20%' }}
              onChange={(evt) => this.setState({ details: evt.target.value })} value={this.state.details}
              floatingLabelText="Description" /> <br />

            <TextField hintText="Bid Ammount" inputStyle={styles.textField} floatingLabelFocusStyle={{ color: 'yellow' }}
              underlineFocusStyle={{ borderColor: 'yellow' }} style={{ marginLeft: '25%', marginRight: '20%' }}
              onChange={(evt) => this.setState({ personAmount: evt.target.value })} floatingLabelText="Bid Ammount"
              value={this.state.personAmount} type="number"
            /> <br />
            <Button onClick={() => this.handleClose()}>Close</Button>
            <Button onClick={() => this.sendDataApplyForBid()}>Submit</Button>
          </DialogActions>
        </Dialog>



        <Dialog
          open={this.state.open1}
          onClose={() => this.handleClose1()}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
        >
          <DialogTitle>
            User who apply for this bid.
                            </DialogTitle>
          <DialogActions style={{ display: 'block' }}>
            <Table style={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell numeric>
                    Email
                                    </TableCell>

                  <TableCell numeric>
                    Description
                                    </TableCell>

                  <TableCell numeric>
                    Bid Amount
                                    </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.getApplicants.ApplicantsData.map((text, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        {text.Email}
                      </TableCell>

                      <TableCell>
                        {text.Description}
                      </TableCell>

                      <TableCell>
                        {text.Amount}
                      </TableCell>
                    </TableRow>

                  )
                })}
              </TableBody>
            </Table>
          </DialogActions>
        </Dialog>
      </div>





    );
  }
}


export function mapStateToProp(state) {
  // console.log(state)
  return {
    getProductData: state.root,
    getApplicants: state.root
  }
}

export function mapDispatchToProp(dispatch) {
  return {
    fetchTheData: (data) => { dispatch(fetchTheData(data)) },
    appliedToJobs: (bidDetails) => { dispatch(appliedToJobs(bidDetails)) },
    ApplicantPerson: (data) => { dispatch(ApplicantPerson(data)) },
    falseTheFlag: (flag) => { dispatch(falseTheFlag(flag)) }
  }
}


export default connect(mapStateToProp, mapDispatchToProp)(BidMenubar);
